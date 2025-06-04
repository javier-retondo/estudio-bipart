import { Type } from 'class-transformer';
import { IsInt, IsPositive } from 'class-validator';

export class SecureRouteDTO {
   @IsInt({ message: 'El ID del módulo debe ser un número entero' })
   @IsPositive({ message: 'El ID del módulo debe ser un número positivo' })
   @Type(() => Number)
   module_id: number;

   constructor(module_id: number) {
      this.module_id = module_id;
   }
}
