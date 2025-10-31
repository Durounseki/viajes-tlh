const toHex = (buffer) =>
  [...new Uint8Array(buffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

const fromHex = (hex) =>
  new Uint8Array(hex.match(/.{2}/g).map((byte) => parseInt(byte, 16)));

export async function hashPassword(password) {
  try {
    const encoder = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    const hashBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );

    const hash = toHex(hashBuffer);
    const saltHex = toHex(salt);
    return `${hash}:${saltHex}`;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

export async function verifyPassword(password, storedHashAndSalt) {
  try {
    const [hash, saltHex] = storedHashAndSalt.split(":");
    if (!hash || !saltHex) return false;

    const encoder = new TextEncoder();
    const salt = fromHex(saltHex);

    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveBits", "deriveKey"]
    );

    const hashToVerifyBuffer = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );

    const hashToVerify = toHex(hashToVerifyBuffer);
    return hashToVerify === hash;
  } catch (error) {
    console.error("Error verifying password:", error);
    return false;
  }
}
