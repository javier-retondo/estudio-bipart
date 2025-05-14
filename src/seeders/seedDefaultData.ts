import { defaultDataSeeder } from './defaultData';

(async () => {
   console.log('Iniciando seed de datos por defecto...');
   await defaultDataSeeder.run();
   console.log('Seed de datos por defecto finalizado');
})().finally(() => {
   process.exit(0);
});
