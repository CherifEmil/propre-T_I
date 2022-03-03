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
    const pemExported = `-----BEGIN PUBLIC KEY-----${exportedAsBase64}-----END PUBLIC KEY-----`;
    return pemExported;
  }

  async function exportCryptoKeyPr(key) {
    const exported = await window.crypto.subtle.exportKey(
      "pkcs8",
      key
    );
    const exportedAsString = ab2str(exported);
    const exportedAsBase64 = window.btoa(exportedAsString);
    const pemExported = `-----BEGIN PRIVATE KEY-----\n${exportedAsBase64}\n-----END PRIVATE KEY-----`;
    return pemExported;
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
    let New_name = document.querySelector("#n_Name");
    let New_mail = document.querySelector("#n_Mail");;
    exportButton.addEventListener("click", () => {
        exportCryptoKeyPu(keyPair.publicKey).then(Str_data =>{
            let New_mail = document.querySelector("#n_Mail");;
            window.localStorage.setItem(New_mail.value+'_Pu',Str_data);  
      });
        exportCryptoKeyPr(keyPair.privateKey).then(Str_data =>{
            let New_mail = document.querySelector("#n_Mail");;
            window.localStorage.setItem(New_mail.value+'_Pr',Str_data);
        
            alert(localStorage.getItem(New_mail.value+'_Pr'));
            alert(localStorage.getItem(New_mail.value+'_Pu'));
      New_mail.value="";
      New_name.value= "";});
    }
 )
});
