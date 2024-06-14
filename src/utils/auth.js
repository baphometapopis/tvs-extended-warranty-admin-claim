import CryptoJS from 'crypto-js';

const STORAGE_KEY_PREFIX = 'tvsextendclaimadmin';
const SECRET_KEY = 'indicosmic'; // Replace with your own secret key

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const setUserSession = (user) => {
  const timestamp = new Date().getTime();
  const expirationTime = timestamp + 12 * 60 * 60 * 1000; // 12 hours
  const userData = { ...user, expirationTime };
  const encryptedData = encryptData(userData);
  localStorage.setItem(`${STORAGE_KEY_PREFIX}`, encryptedData);
};

export const getUserSession = () => {
  const encryptedData = localStorage.getItem(`${STORAGE_KEY_PREFIX}`);
  if (!encryptedData) return null;

  const userData = decryptData(encryptedData);
  const currentTime = new Date().getTime();

  if (currentTime > userData.expirationTime) {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}`);
    return null;
  }

  return userData;
};

export const clearUserSession = () => {
  localStorage.removeItem(`${STORAGE_KEY_PREFIX}`);
};
