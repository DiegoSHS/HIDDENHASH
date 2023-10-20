import { connex } from "@/models/connector"
import { saveHash } from "@/models/transactions"

export default async function handler(req, res) {
  try {
    const { body, method } = req
    if (method !== 'POST') return new Error('metodo no permitido')
    const collection = connex({ collec: 'hashes' })
    const saveResult = await saveHash(collection, body)
    res.status(200).json({ message: `Guardado con éxito`, id: saveResult.insertedId })
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: `algo salió mal al realizar el hashing ${error.message}` } })
  }
}
