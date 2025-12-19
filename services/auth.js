import * as Crypto from "expo-crypto";

export const hashPassword = async (password) => {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
  return hash;
};

export const verifyPassword = async (password, hashedPassword) => {
  const hash = await hashPassword(password);
  return hash === hashedPassword;
};

export const generateTemporaryPassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};
