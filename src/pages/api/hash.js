import { hasher } from "@/components/hashgen"

export default function handler(req, res) {
  try {
    const { body, method } = req
    if (method !== 'POST') return new Error('metodo no permitido')
    const { text, hashType } = JSON.parse(body)
    const hash = hasher(text, hashType)
    const hashResult = {
      hashType,
      hash: hash.toUpperCase(),
      original: text
    }
    console.log(hashResult)
    res.status(200).json(hashResult)
  } catch (error) {
    res.status(500).json({ msj: `algo salió mal al realizar el hashing ${error.message}` })
  }
}
