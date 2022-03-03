
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
  async function exportCryptoKeyPu(key) {
    const exported = await window.crypto.subtle.exportKey(
      "spki",
      key
    );
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = `-----BEGIN PUBLIC KEY-----\n${exportedAsBase64}\n-----END PUBLIC KEY-----`;
    console.log(pemExported);
  }

  async function exportCryptoKeyPr(key) {
    const exported = await window.crypto.subtle.exportKey(
      "pkcs8",
      key
    );
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
    console.log(pemExported);
  }

  window.crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
    
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  ).then((keyPair) => {
    const exportButton = document.querySelector("#sub_N_contact");
    const mail = document.querySelector("#N_mail");
    exportButton.addEventListener("click", () => {
      exportCryptoKeyPu(keyPair.publicKey);
      exportCryptoKeyPr(keyPair.privateKey);
    }

  )});
