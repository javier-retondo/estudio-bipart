import { join } from 'path';
import { decryptFile, encryptFile } from '.';

const action = process.argv[2];
const secretKey = process.argv[3];

if (!action || !secretKey) {
   console.error('❌ Uso: npm run envFile <encrypt|decrypt> <secretKey>');
   process.exit(1);
}

if (action === 'encrypt') {
   encryptFile(join('.env'), join('.env.enc'), secretKey);
} else if (action === 'decrypt') {
   decryptFile(join('.env.enc'), join('.env'), secretKey);
} else {
   console.error('❌ Acción inválida. Usá "encrypt" o "decrypt"');
   process.exit(1);
}
