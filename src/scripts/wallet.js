import { PrivateKey, Address } from 'litecore-lib';
import { generateMnemonic, validateMnemonic } from 'bip39'
import { AES, SHA256, enc } from 'crypto-js';

var balance = require('crypto-balances');

//creates a new wallet address using a random BIP39 mnemonic
function createWallet(password) {

    let mnemonic = generateMnemonic();
    let pkey = new PrivateKey(SHA256(mnemonic).toString());

    let wallet = {
        privateKey: pkey,
        bip: mnemonic,
        publicKey: pkey.toAddress()
    };

    return wallet;
}

//unlocks a wallet with an unencrypted private key
function unlockWallet(privateKey) {

    let pkey = new PrivateKey(privateKey);
    let address = pkey.toAddress();

    if (PrivateKey.isValid(pkey) && Address.isValid(address)) {
        return { privateKey: privateKey, publicKey: address };
    }

    else {
        throw new Error('Invalid private key');
    }
}

//unlocks a wallet with an encrypted private key
function unlockWalletEncrypted(privateKeyEnc, password) {
    try {
        let bytes = AES.decrypt(privateKeyEnc.toString(), password);
        let privateKey = bytes.toString(enc.Utf8);
        return unlockWallet(privateKey);
    }
    catch (exception) {
        throw new Error('Invalid encrypted private key or password.');
    }
}

//unlock a wallet given the BIP39 mnemonic
function unlockWalletBIP(mnemonic) {

    if (validateMnemonic(mnemonic)) {
        return unlockWallet(SHA256(mnemonic).toString());
    }

    throw new Error('Invalid BIP39 mnemonic.');

}

//creates the keystore file
function createKeystore(wallet, password) {

    let keystore = {
        address: wallet.publicKey.toString(),
        crypto: AES.encrypt(wallet.privateKey.toString(), password)
    };

    return keystore;
}

function decryptKeystore(keystore, password) {

    try {

        let bytes = AES.decrypt(keystore.crypto.toString(), password);
        let decryptedKey = new PrivateKey(bytes.toString(enc.Utf8));

        if (PrivateKey.isValid(decryptedKey) && Address.isValid(keystore.address) &&
            decryptedKey.toAddress().toString() === keystore.address) {
            return {
                privateKey: decryptedKey,
                publicKey: decryptedKey.toAddress()
            }
        }
    }
    catch (e) {
        throw new Error('Keystore/password error.');
    }
}

async function getBalance(publicKey) {

    if (Address.isValid(publicKey)) {

        await balance(publicKey, (err, res) => {

            if (res !== []) {
                const amount = res[0].quantity;
                return amount;
            }

        });
    }

    else {
        throw new Error('Invalid public key.');
    }


}

export {
    createWallet, unlockWallet, unlockWalletEncrypted,
    createKeystore, decryptKeystore, getBalance
}