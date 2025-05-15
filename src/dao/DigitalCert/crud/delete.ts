import { DigitalCert } from '../model';
import { EntityDeleter } from '../../../abstractions/sequelizeBases/baseDelete';
import { DIGITAL_CERT } from '../metadata';

class DigitalCertsDeleter extends EntityDeleter {
   model = DigitalCert;
   entityName = DIGITAL_CERT.SINGULAR;
}

export const digitalCertsDeleter = new DigitalCertsDeleter();
