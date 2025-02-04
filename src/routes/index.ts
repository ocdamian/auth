import { Application, Router } from 'express';
import swaggerUI from "swagger-ui-express";

import swaggerJsDoc from "swagger-jsdoc";
import { options } from '../swaggerOptions';

import authRoutes from '../routes/auth.route';

const specs = swaggerJsDoc(options);
const version = 'v1';
const routerApi = (app: Application) => {
    const router = Router();
    app.use(`/api/${version}`, router);
    app.use(`/api/${version}/docs`, swaggerUI.serve, swaggerUI.setup(specs));
    router.use('/', authRoutes);
}

export default routerApi;