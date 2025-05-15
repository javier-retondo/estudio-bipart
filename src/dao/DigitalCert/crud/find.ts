import { IDigitalCert, IDigitalCertAssociations, IDigitalCertColumnsAliases } from '../interface';
import { DigitalCert } from '../model';
import { DIGITAL_CERT } from '../metadata';
import { EntityFinder } from '../../../abstractions/sequelizeBases/baseFind';
import { digitalCertIncludes } from '../includes';

class DigitalCertsFinder extends EntityFinder<
   IDigitalCert,
   IDigitalCertAssociations,
   IDigitalCertColumnsAliases
> {
   model = DigitalCert;
   tableName = DIGITAL_CERT.TABLE;
   columns = DIGITAL_CERT.COLUMNS;
   associations = digitalCertIncludes;
}
export const digitalCertsFinder = new DigitalCertsFinder();
