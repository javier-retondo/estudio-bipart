import { decrypt } from '.';

(() => {
   if (process.argv.length !== 3) {
      console.error('❌ Error: No arguments needed');
      process.exit(1);
   }
   const data = process.argv.slice(2)[0].split('/');
   console.log('data :>> ', data);
   const encryptedData = data[0];
   const iv = Buffer.from(data[1], 'hex');
   console.log('🔓 Decrypting data...');
   const decryptedData = decrypt(encryptedData, iv);
   console.log('✅ Data decrypted');
   console.log('data decrypted :>> ', decryptedData);
})();
