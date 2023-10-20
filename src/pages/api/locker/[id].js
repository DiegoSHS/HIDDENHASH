import { connex } from "@/models/connector";
import { deleteHash, getHash } from "@/models/transactions";

export default async function HandleIndex(req, res) {
    try {
        const { method, query: { id } } = req
        const collection = connex({})
        switch (method) {
            case 'DELETE':
                await deleteHash(collection, id)
                return res.status(200).json({})
            case 'GET':
                const locker = await getHash(collection, id)
                return res.status(200).json(locker)
            default:
                return res.status(405).json({ error: { code: 405, message: 'Method not allowed' } })
        }
    } catch (error) {
        return res.status(500).json({ error: { code: 500, message: error.message } })
    }
}