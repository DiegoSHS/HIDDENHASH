import { createHash } from "crypto"
/**
 * Cifra un texto con un algoritmo hash
 * @param {String} text texto a convertir
 * @param {String} method algoritmo de cifrado
 * @returns hash con formato String
 */
export const hasher = (text, method = 'sha256') => {
    return createHash(method).update(text).digest("hex")
}