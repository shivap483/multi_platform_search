import axios from 'axios';
import { appConfig } from '../config/app.config';
import searchUtils from '../utils/search.utils';

const search = async (keyword: any) => {
    const platforms = appConfig.platforms;

  // run serch queries concurrently
    const searchPromises = platforms.map(async (platform) => {
        const searchUrl = await searchUtils.getPlatformSearchUrl(platform, keyword);

        try {
            const response = await axios.get(searchUrl, { timeout: appConfig.SEARCH_TIMEOUT });
            const transformedProduct = await searchUtils.transformSearchResults(platform.name, response)
            return {
                platform: platform.name,
                name: transformedProduct.name,
                image: transformedProduct.imageURL,
                price: transformedProduct.price,
            };
            } catch (error) {
            console.error(`Error searching ${platform.name}:`, error);
            return {
                platform: platform.name,
                results: []
            };
        }
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