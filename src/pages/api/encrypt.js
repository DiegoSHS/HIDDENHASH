import { createIV, createSecret, kencrypt } from "@/components/hashgen"
import { connex } from "@/models/connector"
import { saveHash } from "@/models/transactions"

export default async function Encrypt(req, res) {
    try {
        const { body: { text, secret_key, email, name } } = req
        const collection = connex({})
        const key = createSecret(secret_key)
        const encryptionIV = createIV(process.env.SECRET_IV)
        const encrypted = kencrypt(text, { key, encryptionIV })
        await saveHash(collection, { encrypted, email, name })
        return res.status(200).json({ message: 'Encriptado con éxito', encrypted, error: false })
    } catch (error) {
        return res.status(500).json({ error: { message: `Algo salió mal: ${error.message}` } })
    }
}