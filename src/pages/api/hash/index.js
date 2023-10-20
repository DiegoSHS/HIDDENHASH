import { hasher } from "@/components/hashgen"

export default function handler(req, res) {
  try {
    const { body: { text, algorithm }, method } = req
    if (method !== 'POST') return new Error('metodo no permitido')
    const hash = hasher(text, algorithm)
    const hashResult = {
      algorithm,
      hash: hash.toUpperCase(),
      original: text
    }
    res.status(200).json(hashResult)
  } catch (error) {
    res.status(500).json({ error: { code: 500, message: `algo salió mal al realizar el hashing ${error.message}` } })
  }
}
