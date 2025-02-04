import express, { Application } from 'express';
import cors from 'cors';
import routerApi from './routes';
import morgan from 'morgan';
import { factoryLogger } from './utils/logger';

const logger = factoryLogger();
import dotenv from 'dotenv';
// import { initDatabases } from './database/dbcontext';
dotenv.config();

const app: Application = express();
const port: string = '3000';

// connection database
// initDatabases();
app.use(morgan('dev'));

app.use( cors() );
app.use(express.json());  


routerApi(app);

app.listen(port, () => {
    logger.info(`server running in port ${port}`);
});