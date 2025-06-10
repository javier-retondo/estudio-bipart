import 'reflect-metadata';
import { Server } from './server';
import { InitAllAssociations } from './dao/associations';
const server = new Server();

(async () => {
   await server.handleConn();
   InitAllAssociations();
   server.start();
})();
