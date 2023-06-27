import axios from 'axios';
import cheerio from 'cheerio';
import { Platform } from '../constants/platforms';
import { ParsedData } from '../models/parsed.data.model';
import { ScrappingService } from "./scrapper.service";

export class CromaScrapper extends ScrappingService{
    constructor(url:string){
        super(url)
        this.platformName=Platform.CROMA
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
        const elements = $('.product-item')
        elements.each((index, el)=>{
            const item = $(el)
            const title = item.find('h3.product-title').text().trim()
            const imageUrl = item.find('img').attr('src')
            const price = item.find('span.amount').text()
            results.push({title, price, image:imageUrl})
        })
        return results;
    }
}