import { createHash, createCipheriv } from "crypto"
/**
 * Default value for creating key and initialization value
 */
const SECRET_KEY = process.env.SECRET_KEY

/**
 * Generates hash from plain text
 * @param {String} text initial text
 * @param {String} method hash algorithm
 * @returns hash string
 */
export const hasher = (text, method = 'sha256') => {
    return createHash(method).update(text).digest("hex")
}
/**
 * Creates a hash key
 * @param {String} key initial key value
 * @returns hash key
 */
export const createSecret = (key) => {
    const resutlKey = createHash('sha512').update(key).digest('hex').substring(0, 32)
    return resutlKey
}
/**
 * Creates a initialization value for encryption/decryption
 * @param {String} key initial key value
 * @returns hash iv
 */
export const createIV = (key) => {
    const encryptionIV = createHash('sha512').update(key).digest('hex').substring(0, 16)
    return encryptionIV
}
/**
 * Default secret key
 */
const KEY = createSecret(SECRET_KEY)
/**
 * Default initialization value
 */
const ENCRYPTIONIV = createIV(SECRET_KEY)
/**
 * Encrypts a text with a key
 * @param {String} text text to encrypt
 * @param {Object} param1 options (method,key,iv)
 * @returns excrypted string
 */
export const kencrypt = (text, { encryption_method = 'aes-256-cbc', key = KEY, encryptionIV = ENCRYPTIONIV }) => {
    const cipher = createCipheriv(encryption_method, key, encryptionIV)
    const finalCypher = cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
    const string = Buffer.from(finalCypher).toString('base64')
    return string
}
/**
 * Decrypts a encrypted text with a key
 * @param {String} encText encrypted text
 * @param {*} param1 object with options (method,key,iv)
 * @returns decrypted text
 */
export const kdecrypt = (encText, { encryption_method = 'aes-256-cbc', key = KEY, encryptionIV = ENCRYPTIONIV }) => {
    const buff = Buffer.from(encText, 'base64')
    const decipher = crypto.createDecipheriv(encryption_method, key, encryptionIV)
    const decText = decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8')
    return decText
}