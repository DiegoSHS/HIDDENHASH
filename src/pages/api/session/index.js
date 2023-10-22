import { connex } from "@/models/connector";
import { getlockers, saveHash } from "@/models/transactions";

export default async function HandleIndex(req, res) {
    try {
        const { method, body: { email, name } } = req
        const collection = connex({ collec: 'users' })
        switch (method) {
            case 'GET':
                const result = await getlockers(collection, {})
                return res.status(200).json(result)
            case 'POST':
                const exist = await getlockers(collection, { email })
                if (exist.length !== 0) {
                    return res.status(200).json({ error: { code: 200, message: 'Already exists' } })
                }
                const saved = await saveHash(collection, { email, name })
                return res.status(200).json(saved)
            default:
                return res.status(405).json({ error: { code: 405, message: 'Method not allowed' } })
        }
    } catch (error) {
        return res.status(500).json({ error: { code: 500, message: error.message } })
    }
}