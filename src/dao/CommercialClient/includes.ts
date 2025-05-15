import { ICommercialClientAssociations } from './interface';

export const commercialClientIncludes: {
   model: any;
   as: ICommercialClientAssociations[keyof ICommercialClientAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
