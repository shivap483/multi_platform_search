import axios from 'axios';
import cheerio from 'cheerio';
import { Platform } from '../constants/platforms';
import { ParsedData } from '../models/parsed.data.model';
import { ScrappingService } from "./scrapper.service";

export class AmazonScrapper extends ScrappingService{
    constructor(url:string){
        super(url)
        this.platformName=Platform.AMAZON
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
        const elements = $('.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16')
        elements.each((index, el)=>{
            const item = $(el)
            const title = item.find('span.a-size-medium.a-color-base.a-text-normal').text().trim()
            const price = item.find('span.a-price-whole').text()
            const imageUrl = item.find('img').attr('src')
            results.push({title, price, image:imageUrl})
        })
        return results;
    }
}