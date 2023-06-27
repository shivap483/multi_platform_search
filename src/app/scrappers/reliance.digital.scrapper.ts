import axios from 'axios';
import cheerio from 'cheerio';
import { Platform } from '../constants/platforms';
import { ParsedData } from '../models/parsed.data.model';
import { ScrappingService } from "./scrapper.service";

export class RelianceDigitalScrapper extends ScrappingService{
    constructor(url:string){
        super(url)
        this.platformName=Platform.RELIACE_DIGITAL
    }


    public async scrapeData(keyword: string): Promise<any> {
        try {
            const url = `${this.url}${keyword}`
            const headers = {
                'User-Agent':'Local User Agent',
            };
            const response = await axios.get(url, {headers});
            return response.data
            } catch (error) {
            console.error(`Error searching ${this.platformName}:`, error);
            return Promise.reject();
        }
    }

    public async parse(html: any): Promise<ParsedData[]> {
        const results: ParsedData[] =[]
        const $ = cheerio.load(html)
        const elements = $('.sp.grid')
        elements.each((index, el)=>{
            const item = $(el)
            const title = item.find('p.sp__name').text().trim()
            const imageUrl = `https://www.reliancedigital.in${item.find('img').attr('src')}`
            const price = item.find('span.TextWeb__Text-sc-1cyx778-0.gimCrs').find('span').eq(1)
            results.push({title, price:price.text(), image:imageUrl})
        })
        return results;
    }
}