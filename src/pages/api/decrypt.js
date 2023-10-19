import { createIV, createSecret, kdecrypt } from "@/components/hashgen"

export default function Encrypt(req, res) {
    try {
        const { body: { text, secret_key, options: { encryption_method } } } = req
        const key = createSecret(secret_key)
        const encryptionIV = createIV(key)
        const decrypted = kdecrypt(text, { key, encryption_method, encryptionIV })
        return res.status(200).json({ message: 'Desencriptado con éxito', decrypted, error: false })
    } catch (error) {
        return res.status(500).json({ error: { message: `Algo salió mal: ${error.message}` } })
    }
}