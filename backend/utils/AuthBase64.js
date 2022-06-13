const authBase64 = (consumer_Key, consumer_Secret) => {
  let buffer = Buffer.from(`${consumer_Key}:${consumer_Secret}`).toString(
    "base64"
  );
  return buffer;
};

module.exports = authBase64;
