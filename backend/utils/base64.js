const passwordBBase64 = (shortCode, passkey, timeStamp) => {
  const buffer = Buffer.from(shortCode + passkey + timeStamp).toString(
    "base64"
  );
  return buffer;
};

module.exports = passwordBBase64;
