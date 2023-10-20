import { createIV, createSecret, kdecrypt } from "@/components/hashgen"

export default function Encrypt(req, res) {
    try {
        const { body: { text, secret_key } } = req
        const key = createSecret(secret_key)
        const encryptionIV = createIV(process.env.SECRET_IV)
        const decrypted = kdecrypt(text, { key, encryptionIV })
        return res.status(200).json({ message: 'Desencriptado con éxito', decrypted, error: false })
    } catch (error) {
        const regex = RegExp('bad decrypt')
        if (regex.test(error.message)) return res.status(401).json({ error: { message: 'Clave incorrecta' } })
        return res.status(500).json({ error: { message: `Algo salió mal: ${error.message}` } })
    }
}