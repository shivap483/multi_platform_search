const transformSearchResults = async(platformName: String, response:any)=>{
    // here we can either apply filters or sort the results.
    const transformedResult: any[] = []
    switch(platformName){
        case 'amazon':
            // call amazon transformer
            break;
        case 'flipkart':
            // call flipkart transformer
            break;
        default:
            // call default transformer
            break;

    }
    // Currently I'm just returning 1 items of the results.
    if (response.data?.results?.length>0) {
        transformedResult.push(response.data.results[0])
    }
    return transformedResult;
}

const getPlatformSearchUrl= async(platform: any, keyword: string)=>{

    switch(platform){
        case 'amazon':
            // call amazon searchUrl getter
            break;
        case 'flipkart':
            // call flipkart searchUrl getter
            break;
        default:
            // call default transformer
            break;

    }
    // Currently I'm just returning a parameterized string
    return `${platform.url}?${platform.queryKeyword}=${keyword}`
}

export default {transformSearchResults, getPlatformSearchUrl};