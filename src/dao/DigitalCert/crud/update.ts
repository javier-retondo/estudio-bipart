import { IDigitalCert } from '../interface';
import { DigitalCert } from '../model';
import { DIGITAL_CERT } from '../metadata';
import { EntityUpdater } from '../../../abstractions/sequelizeBases/baseUpdate';

class DigitalCertsUpdater extends EntityUpdater<IDigitalCert> {
   model = DigitalCert;
   entityName = DIGITAL_CERT.SINGULAR;
}

export const digitalCertsUpdater = new DigitalCertsUpdater();
