import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi_wallet from 'swagger-ui-express';
import { ConfigServer, sequelize } from './config';
import { error } from './utils/network/responses';
import docJson from '../documentation/api_v1.json';
//import { apiLimiter } from './config/rateLimit';
import { Routes } from './api/routes';
import { readFileSync } from 'fs';
import https from 'https';

const staticFolderPath = path.join(__dirname, '..', 'public');

export class Server extends ConfigServer {
   public app: express.Application;
   public port: number = this.getNumberEnvironment('PORT');
   public apiBaseUrlV1 = this.getEnvironment('API_BASE_URL_V1') || '/api/v1';

   constructor() {
      super();
      this.app = express();
      this.config();
      this.routes();
   }

   config() {
      this.app.use(morgan('dev'));
      this.app.use(cors());
      this.app.set('view engine', 'ejs');
      this.app.set('views', path.join('templates'));
      this.app.use(express.json({ limit: '1mb' }));
      this.app.use(express.urlencoded({ extended: false }));
   }
   routes() {
      this.app.use('/static', express.static(staticFolderPath));
      // this.app.use(this.apiBaseUrlV1, apiLimiter);
      this.app.use(this.apiBaseUrlV1, this.routers_v1());
      this.app.use(
         '/api/v1/documentation',
         swaggerUi_wallet.serveFiles(docJson, {}),
         swaggerUi_wallet.setup(docJson),
      );
      this.app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) =>
         error({ req, res, body: err.toString(), status: 500, next }),
      );
      this.app.use('*', (req, res) => {
         res.status(404).sendFile(path.join(staticFolderPath, 'pages', 'error404.html'));
      });
   }

   routers_v1(): express.Router[] {
      return Routes;
   }

   handleConn = async () => {
      try {
         await sequelize.authenticate();
         console.log('Connected to the database: ', this.getEnvironment('DB_NAME'));
      } catch (error) {
         console.error('Unable to connect to the database:', error);
      }
   };

   start(env: string = 'development') {
      if (env === 'production') {
         const key = this.getEnvironment('KEY_PATH');
         const cert = this.getEnvironment('CERT_PATH');
         // see the content of cert and key

         if (!key || !cert) {
            console.error('SSL key or certificate path is not set in environment variables.');
            return;
         }
         console.log('Starting server in production mode with SSL...');
         console.log('SSL key path:', readFileSync(path.join(key), 'utf8'));
         console.log('SSL cert path:', readFileSync(path.join(cert), 'utf8'));
         const options = {
            key: readFileSync(path.join(key), 'utf8'),
            cert: readFileSync(path.join(cert), 'utf8'),
         };
         console.log('Ruta cert', path.join(cert));
         https.createServer(options, this.app).listen(this.app.get('port'), () => {
            console.log('The base URL is: ', this.apiBaseUrlV1);
            console.log('Environment: ', this.getEnvironment('NODE_ENV'));
            console.log('Server connected in port: ', this.port);
         });
      } else {
         this.app.listen(this.port, () => {
            console.log('The base URL is: ', this.apiBaseUrlV1);
            console.log('Environment: ', this.getEnvironment('NODE_ENV'));
            console.log('Server connected in port: ', this.port);
         });
      }
   }
}
