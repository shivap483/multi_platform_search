import express from 'express';
import application from '../constants/application';
import indexRoute from '../routes/index.route';
const app = express();

// logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

// routing the requests to appropriate routes
app.use(application.url.base, indexRoute);



export default app;