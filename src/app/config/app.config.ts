const dotenv = require('dotenv');

dotenv.config()

export const appConfig = {
    port: process.env.PORT,
    platforms: [
        { name: 'amazon', url: `${process.env.AMAZON_BASE_URI}`, queryKeyword:'q' },
        { name: 'flipkart', url: `${process.env.FLIPKART_BASE_URI}`, queryKeyword:'q' },
        { name: 'croma', url: `${process.env.CROMA_BASE_URI}`, queryKeyword:'query' },
        { name: 'reliance_digital', url: `${process.env.RELIANCE_DIGITAL_BASE_URI}`, queryKeyword:'keyword' }
    ],
    SEARCH_TIMEOUT: 500,
}