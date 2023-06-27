import { appConfig } from '../config/app.config';
import searchUtils from '../utils/search.utils';

const search = async (keyword: any) => {
    const platforms = appConfig.platforms;

  // run serch queries concurrently
    const searchPromises = platforms.map(async (platform) => {
        const scrapper = await searchUtils.getScrapper(platform);
        const scrappedData = scrapper.scrapeData(keyword).then(async (responseData)=>{
            const parsedData = await scrapper.parse(responseData)
            return {platform: platform.name, results: parsedData};
        }).catch((err)=>{
            console.error(`Error searching ${platform.name}:`, err);
            return {
                platform: platform.name,
                results: []
            };
        });
        return scrappedData;
    });
    // wait for all platforms to resolve
    const searchResults = await Promise.all(searchPromises);

    const response: {
        results: { [key: string]: any[] }
    } = { results: {} };

    searchResults.forEach((result) => {
        response.results[result.platform] = result.results;
    });

    return response.results;
}

export default {
    search
}