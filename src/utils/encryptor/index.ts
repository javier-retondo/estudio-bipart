import crypto from 'crypto';
import { ConfigServer } from '../../config';
import { readFileSync, writeFileSync } from 'fs';

const secretKey = crypto
   .createHash('sha256')
   .update(ConfigServer.prototype.secretKey || 'secretKey')
   .digest('base64')
   .substring(0, 32);

export function encrypt(text: string): { encryptedData: string; iv: Buffer } {
   const iv = crypto.randomBytes(16);
   const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
   let encrypted = cipher.update(text, 'utf8', 'hex');
   encrypted += cipher.final('hex');
   return { encryptedData: encrypted, iv };
}

export function decrypt(encryptedText: string, iv: Buffer): string {
   try {
      const decipher = crypto.createDecipheriv('aes-256-cbc', secretKey, iv);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
   } catch (error) {
      console.error('Error al desencriptar:', error);
      return '';
   }
}

export function encryptFile(inputPath: string, outputPath: string, key: string) {
   const secretKey = crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);
   const algorithm = 'aes-256-cbc';
   const iv = Buffer.alloc(16, 0);
   const data = readFileSync(inputPath, 'utf8');
   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
   const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
   writeFileSync(outputPath, encrypted.toString('base64'));
   console.log(`✅ ${inputPath} fue encriptado como ${outputPath}`);
}

export function decryptFile(inputPath: string, outputPath: string, key: string) {
   const secretKey = crypto.createHash('sha256').update(key).digest('base64').substring(0, 32);
   const algorithm = 'aes-256-cbc';
   const iv = Buffer.alloc(16, 0);
   const encryptedData = readFileSync(inputPath, 'utf8');
   const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
   const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encryptedData, 'base64')),
      decipher.final(),
   ]);
   writeFileSync(outputPath, decrypted.toString('utf8'));
   console.log(`✅ ${inputPath} fue desencriptado como ${outputPath}`);
}
