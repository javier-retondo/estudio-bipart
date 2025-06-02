import { IsString } from 'class-validator';

export enum AuthOrder {}

export class AuthLoginDTO {
   @IsString()
   username: string;

   @IsString()
   password: string;

   constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
   }
}

export class changePasswordDTO {
   @IsString()
   password: string;

   constructor(password: string) {
      this.password = password;
   }
}
