import { ParsedData } from "../models/parsed.data.model"

export abstract class ScrappingService {
    public url: string
    public platformName: string
    constructor(url:string){
        this.url =url
    }
    public abstract scrapeData(keyword: string): Promise<any>;
    public abstract parse(htmlData: any): Promise<ParsedData[]>;
}