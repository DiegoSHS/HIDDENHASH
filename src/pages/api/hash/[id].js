import { connex } from "@/models/connector";
import { deleteHash, getHash } from "@/models/transactions";

export default async function HandleIndex(req, res) {
    try {
        const { method, query: { id } } = req
        const collection = connex({ collec: 'hashes' })
        switch (method) {
            case 'DELETE':
                await deleteHash(collection, id)
                return res.status(200).json({})
            case 'GET':
                const hash = await getHash(collection, id)
                return res.status(200).json(hash)
            default:
                return res.status(405).json({ error: { code: 405, message: 'Method not allowed' } })
        }
    } catch (error) {
        return res.status(500).json({ error: { code: 500, message: error.message } })
    }
}