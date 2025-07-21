import CryptoJS from 'crypto-js';

// Shared AES key (must match ESP32 side)
const AES_SECRET_KEY = '12345678901234567890123456789012'; // 32-byte key for AES-256

export function encryptAES(message) {
  const ciphertext = CryptoJS.AES.encrypt(message, AES_SECRET_KEY).toString();
  return ciphertext;
}

export function decryptAES(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, AES_SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}