const dotenv = require('dotenv');
export const appConfig = {
    port: process.env.PORT,
    platforms: [
        { name: 'amazon', url: `${process.env.AMAZON_BASE_URI}/search}`, queryKeyword:'q' },
        { name: 'flipkart', url: `${process.env.AMAZON_BASE_URI}/search}`, queryKeyword:'keyword' },
        { name: 'croma', url: `${process.env.AMAZON_BASE_URI}/search}`, queryKeyword:'key' },
        { name: 'reliance_digital', url: `${process.env.AMAZON_BASE_URI}/search}`, queryKeyword:'q' }
    ],
}