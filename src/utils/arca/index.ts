import { Afip } from 'afip.ts.neko';
import { join } from 'path';

const certDir = join('public', 'arca', 'certs', 'jretondo.crt');
const keyDir = join('public', 'arca', 'keys', 'jretondo.key');

const afip: Afip = new Afip({
   key: keyDir,
   cert: certDir,
   cuit: 20350925148,
   ticketPath: join('public', 'arca', 'tickets', 'jretondo.json'),
});

export async function getCuitData(cuit: number) {
   try {
      const data = await afip.registerInscriptionProofService.getTaxpayerDetails(cuit);
      return data;
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
