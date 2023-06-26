import axios from 'axios';
import { appConfig } from '../config/app.config';

const search = async (query: any) => {
    const platforms = appConfig.platforms;

  // run serch queries concurrently
  const searchPromises = platforms.map(async (platform) => {
    const searchUrl = `${platform.url}?${platform.queryKeyword}=${query}`

    try {
      const response = await axios.get(searchUrl);
      return {
        platform: platform.name,
        results: response.data.results
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

  const response = {
    results: {}
  };

  searchResults.forEach((result) => {
    response.results[result.platform] = result.results;
  });

  return searchResults;
}

export default {
    search
}