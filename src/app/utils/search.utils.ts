import { Platform } from "../constants/platforms";
import { AmazonScrapper } from "../scrappers/amazon.scrapper";
import { CromaScrapper } from "../scrappers/croma.scrapper";
import { FlipkartScrapper } from "../scrappers/flipkart.scrapper";
import { RelianceDigitalScrapper } from "../scrappers/reliance.digital.scrapper";
import { ScrappingService } from "../scrappers/scrapper.service";

const transformSearchResults = async(platformName: String, response:any)=>{
    // here we can either apply filters or sort the results.
    let transformedResult: any
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
        transformedResult= response.data.results[0]
    }
    return transformedResult;
}

const getScrapper= async(platform: any)=>{
    var scrapper: ScrappingService

    switch(platform.name){
        case Platform.AMAZON:
            scrapper = new AmazonScrapper(platform.url)
            break;
        case Platform.FLIPKART:
            scrapper = new FlipkartScrapper(platform.url)
            break;
        case Platform.CROMA:
            scrapper =  new CromaScrapper(platform.url)
            break;
        case Platform.RELIACE_DIGITAL:
            scrapper = new RelianceDigitalScrapper(platform.url)
        default:
            // call default transformer
            break;

    }
    return scrapper;
    //return `${platform.url}?${platform.queryKeyword}=${keyword}`
}

export default {transformSearchResults, getScrapper};