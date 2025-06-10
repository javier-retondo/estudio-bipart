import 'reflect-metadata';
import { Server } from './server';
import { InitAllAssociations } from './dao/associations';
const server = new Server();

(async () => {
   await server.handleConn();
   InitAllAssociations();
   const env = process.env.NODE_ENV || 'development';
   server.start(env);
})();
