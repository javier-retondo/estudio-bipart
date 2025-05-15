import { IDigitalCertAssociations } from './interface';

export const digitalCertIncludes: {
   model: any;
   as: IDigitalCertAssociations[keyof IDigitalCertAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
