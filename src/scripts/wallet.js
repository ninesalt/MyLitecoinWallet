let litecore = require('litecore-lib');
let crypto = require('crypto-js');

function createWallet() {

    let pkey = new litecore.PrivateKey();

    let wallet = {
        privateKey: pkey,
        publicKey: pkey.toAddress()
    };

    return wallet;
}

function createKeystore(wallet, password) {

    let keystore = {
        address: wallet.publicKey.toString(),
        crypto: crypto.AES.encrypt(wallet.privateKey.toString(), password)
    };

    return keystore;
}

function decryptKeystore(keystore, password) {

    let bytes = crypto.AES.decrypt(keystore.crypto.toString(), password);
    let decryptedKey = new litecore.PrivateKey(bytes.toString(crypto.enc.Utf8));

    if (keystore.address !== undefined && decryptedKey.toAddress().toString() === keystore.address) {
        return {
            privateKey: decryptedKey,
            publicKey: decryptedKey.toAddress()
        }
    }

    throw new Error('Keystore/password error.');
}

export { createWallet, createKeystore, decryptKeystore }