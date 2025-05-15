import { IOperativeClientAssociations } from './interface';

export const operativeClientIncludes: {
   model: any;
   as: IOperativeClientAssociations[keyof IOperativeClientAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
