// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { hasher } from "@/components/hashgen"

export default function handler(req, res) {
  try {
    const { body: word, method } = req
    if(method !== 'POST') return new Error('metodo no permitido')
    console.log(body)
    const sha256 = hasher(word)
    const sha512 = hasher(word, 'sha512')
    const md5 = hasher(word, 'md5')
    const hashes = {
      sha256,
      sha512,
      md5,
      original: word
    }
    res.status(200).json(hashes)
  } catch (error) {
    res.status(500).json({msj:`algo salió mal al realizar el hashing ${error.message}`})
  }
}
