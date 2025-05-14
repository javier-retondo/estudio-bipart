import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({
   path: path.join(__dirname, '..', '..', '.env'),
});

export abstract class ConfigServer {
   public getEnvironment(env: string) {
      return process.env[env];
   }
   public getNumberEnvironment(env: string): number {
      return Number(this.getEnvironment(env));
   }
   public get nodeEnv() {
      return this.getEnvironment('NODE_ENV');
   }
   public get secretKey() {
      return this.getEnvironment('SECRET_KEY');
   }
   public get dbConnection() {
      return {
         database: this.getEnvironment('DB_NAME'),
         user: this.getEnvironment('DB_USER'),
         password: this.getEnvironment('DB_PASS'),
         host: this.getEnvironment('DB_HOST'),
         port: this.getNumberEnvironment('DB_PORT'),
      };
   }
   public get redis() {
      return {
         host: this.getEnvironment('REDIS_HOST'),
         port: this.getNumberEnvironment('REDIS_PORT'),
         password: this.getEnvironment('REDIS_PASSWORD'),
         database: this.getNumberEnvironment('REDIS_DATABASE'),
      };
   }
}
