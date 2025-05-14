import { encrypt } from '.';

(() => {
   if (process.argv.length !== 3) {
      console.error('❌ Error: No arguments needed');
      process.exit(1);
   }
   const data = process.argv.slice(2);
   console.log('data :>> ', data[0]);
   console.log('🔐 Encrypting data...');
   const encryptedData = encrypt(data[0]);
   console.log('✅ Data encrypted');
   console.log(
      'data encrypted :>> ',
      encryptedData.encryptedData + '/' + encryptedData.iv.toString('hex'),
   );
})();
