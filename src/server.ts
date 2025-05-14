import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi_wallet from 'swagger-ui-express';
import { ConfigServer, sequelize } from './config';
import { error } from './utils/network/responses';
import docJson from '../documentation/api_v1.json';
import { apiLimiter } from './config/rateLimit';
import { Routes } from './api/routes';

const staticFolderPath = path.join(__dirname, '..', 'public');

export class Server extends ConfigServer {
   public app: express.Application;
   public port: number = this.getNumberEnvironment('PORT');
   public apiBaseUrlV1 = this.getEnvironment('API_BASE_URL_V1') || '/api/v1/reports';

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
      this.app.use(this.apiBaseUrlV1, apiLimiter);
      //this.app.use(this.apiBaseUrlV1, this.routers_v1());
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

   start() {
      this.app.listen(this.port, () => {
         console.log('Environment: ', this.getEnvironment('NODE_ENV'));
         console.log('Server connected in port: ', this.port);
      });
   }
}
