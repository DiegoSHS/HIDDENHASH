import { createIV, createSecret, kencrypt } from "@/components/hashgen"

export default function Encrypt(req, res) {
    try {
        const { body: { text, secret_key, options: { encryption_method } } } = req
        const key = createSecret(secret_key)
        const encryptionIV = createIV(secret_key)
        const encrypted = kencrypt(text, { encryption_method, key, encryptionIV })
        return res.status(200).json({ message: 'Encriptado con éxito', encrypted, error: false })
    } catch (error) {
        return res.status(500).json({ error: { message: `Algo salió mal: ${error.message}` } })
    }
}