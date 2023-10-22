import { connex } from "@/models/connector";
import { getlockers, saveHash } from "@/models/transactions";
import { ObjectId } from "mongodb";

export default async function HandleIndex(req, res) {
    try {
        const { method, body } = req
        const collection = connex({ collec: 'shared' })
        switch (method) {
            case 'GET':
                const result = await getlockers(collection, {})
                return res.status(200).json(result)
            case 'POST':
                const { addressee, origin, sharedItems } = body
                const sharedIds = sharedItems.map(e => new ObjectId(e))
                const shared = { addressee, origin, sharedItems: sharedIds }
                const isShared = await getlockers(collection, { origin, addressee })
                if (isShared.length !== 0) {
                    const updated = collection.updateOne({ addressee, origin }, { $addToSet: { sharedItems: { $each: sharedIds } } })
                    return res.status(200).json(updated)
                }
                const saved = await saveHash(collection, shared)
                return res.status(200).json(saved)
            default:
                return res.status(405).json({ error: { code: 405, message: 'Method not allowed' } })
        }
    } catch (error) {
        return res.status(500).json({ error: { code: 500, message: error.message } })
    }
}