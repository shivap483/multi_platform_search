import { Platform } from "../constants/platforms";

const dotenv = require('dotenv');

dotenv.config()

export const appConfig = {
    port: process.env.PORT,
    platforms: [
        { name: Platform.AMAZON, url: `${process.env.AMAZON_BASE_URI}`},
        { name: Platform.FLIPKART, url: `${process.env.FLIPKART_BASE_URI}`},
        { name: Platform.CROMA, url: `${process.env.CROMA_BASE_URI}`},
        { name: Platform.RELIACE_DIGITAL, url: `${process.env.RELIANCE_DIGITAL_BASE_URI}`},
    ],
    SEARCH_TIMEOUT: 5000,
}