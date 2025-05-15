import { IDigitalCert } from '../interface';
import { DigitalCert } from '../model';
import { DIGITAL_CERT } from '../metadata';
import { EntityPatcher } from '../../../abstractions/sequelizeBases/basePatch';

class DigitalCertsPatcher extends EntityPatcher<IDigitalCert> {
   model = DigitalCert;
   entityName = DIGITAL_CERT.SINGULAR;
}

export const digitalCertsPatcher = new DigitalCertsPatcher();
