import { IPymeProductAssociations } from './interface';

export const pymeProductIncludes: {
   model: any;
   as: IPymeProductAssociations[keyof IPymeProductAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
