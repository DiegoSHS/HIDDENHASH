import { createHash } from "crypto"

export const hasher = (text, method = 'sha256') => {
    return createHash(method).update(text).digest("hex")
}