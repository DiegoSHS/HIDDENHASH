import { connex } from "@/models/connector";
import { getlockers, saveHash } from "@/models/transactions";

export default async function HandleIndex(req, res) {
    try {
        const { method, body } = req
        const collection = connex({ collec: 'users' })
        switch (method) {
            case 'GET':
                const result = await getlockers(collection, body)
                return res.status(200).json(result)
            case 'POST':
                const saved = await saveHash(collection, body)
                return res.status(200).json(saved)
            default:
                return res.status(405).json({ error: { code: 405, message: 'Method not allowed' } })
        }
    } catch (error) {
        return res.status(500).json({ error: { code: 500, message: error.message } })
    }
}