import { IDigitalCert } from '../interface';
import { DigitalCert } from '../model';
import { EntityCreator } from '../../../abstractions/sequelizeBases/baseCreate';
import { DIGITAL_CERT } from '../metadata';

class DigitalCertsCreator extends EntityCreator<IDigitalCert> {
   model = DigitalCert;
   entityName = DIGITAL_CERT.SINGULAR;
}

export const digitalCertsCreator = new DigitalCertsCreator();
