import { Afip } from 'afip.ts.neko';
import { readFileSync } from 'fs';
import { join } from 'path';
import { redisClient } from '../../config/redisManager';

const certDir = join('public', 'arca', 'certs', 'jretondo.crt');
const keyDir = join('public', 'arca', 'keys', 'jretondo.key');

const certificateContent = readFileSync(certDir, 'utf-8');
const keyContent = readFileSync(keyDir, 'utf-8');

const afip: Afip = new Afip({
   key: keyContent,
   cert: certificateContent,
   cuit: 20350925148,
   ticketPath: join(__dirname, '..', 'public', 'arca', 'tickets'),
   production: true,
});

export async function getCuitData(cuit: number) {
   try {
      const cacheKey = `arca_cuit_data_${cuit}`;
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
         return JSON.parse(cachedData);
      }
      const data = await afip.registerInscriptionProofService.getTaxpayerDetails(cuit);
      if (!data || Object.keys(data).length === 0) {
         throw new Error(`No se encontraron datos para el CUIT: ${cuit}`);
      }
      if (data.errorConstancia) {
         throw new Error(`Error al obtener datos de ARCA: ${data.errorConstancia}`);
      }
      const regimenesIVA = [20, 30, 32, 33, 34];
      const formattedData = {
         fiscal_name:
            data.datosGenerales.tipoPersona === 'FISICA'
               ? data.datosGenerales.nombre + ' ' + data.datosGenerales.apellido
               : data.datosGenerales.razonSocial,
         fiscal_number: String(cuit),
         is_physical_person: data.datosGenerales.tipoPersona === 'FISICA',
         vat_condition_id: data.datosMonotributo
            ? 20
            : data.datosRegimenGeneral.impuesto.find(
                 (impuesto) =>
                    impuesto.idImpuesto === 20 || regimenesIVA.includes(impuesto.idImpuesto),
              )?.idImpuesto || 0,
         email: '',
         phone: '',
         province: data.datosGenerales.domicilioFiscal.descripcionProvincia || '',
         province_id: data.datosGenerales.domicilioFiscal.idProvincia || 0,
         city: data.datosGenerales.domicilioFiscal.localidad || '',
         address: data.datosGenerales.domicilioFiscal.direccion || '',
         observations: '',
         activities: data.datosRegimenGeneral.actividad || '',
         born_date: data.datosGenerales.fechaContratoSocial || undefined,
      };
      await redisClient.set(cacheKey, JSON.stringify(formattedData), 3600);
      return formattedData;
   } catch (error) {
      console.error('Error al obtener datos de ARCA:', error);
      throw error;
   }
}

export async function getServerStatus() {
   try {
      const status = await afip.registerInscriptionProofService.getServerStatus();
      return status;
   } catch (error) {
      console.error('Error al obtener el estado del servidor ARCA:', error);
      throw error;
   }
}
export async function getMultipleCuitData(cuits: number[]) {
   try {
      const data = await afip.registerInscriptionProofService.getTaxpayersDetails(cuits);
      return data;
   } catch (error) {
      console.error('Error al obtener datos de múltiples CUITs:', error);
      throw error;
   }
}
