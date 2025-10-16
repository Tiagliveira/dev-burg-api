import express from 'express';
import routes from  './routes.js';
import fileRoutesConfig from './config/fileRoutes.cjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes);
app.use('/product-file', fileRoutesConfig)

export default app;