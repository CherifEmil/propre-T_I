var crypto = require('crypto');
const { publicKey, privateKey } =  crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

encry_Data= function (data,publicK){
 let encryptedData = crypto.publicEncrypt(
  {
    key: publicK,
    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
    oaepHash: "sha256",
  },

  Buffer.from(data)
);
return encryptedData.toString("base64")
}

decry_Data= function(data){
    let decryptedData = crypto.privateDecrypt(
        {
          key: privateKey,
       
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: "sha256",
        },
        Buffer.from(data,"base64")
      );
      return decryptedData.toString();
}
get_publicK = function(){
    return  publicKey.export({format: 'pem',type: 'spki'})
}
get_privateK =function(){
    return  privateKey.export({format: 'pem',type:"pkcs8"})
}
console.log(get_publicK())

