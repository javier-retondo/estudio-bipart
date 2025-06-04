import { IsEmail, IsString } from 'class-validator';

export enum AuthOrder {}

export class AuthLoginDTO {
   @IsString({ message: 'El nombre de usuario es obligatorio' })
   username: string;

   @IsString({ message: 'La contraseña es obligatoria' })
   password: string;

   constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
   }
}

export class changePasswordDTO {
   @IsString({ message: 'La contraseña es obligatoria' })
   password: string;

   constructor(password: string) {
      this.password = password;
   }
}

export class AuthResetPasswordDTO {
   @IsEmail({}, { message: 'El email debe ser un email válido' })
   email: string;
   constructor(email: string) {
      this.email = email;
   }
}
