import { connex } from "@/models/connector"
import { ObjectId } from "mongodb"

export default async function HandleIndex(req, res) {
    try {
        const { method, body } = req
        const collection = connex({ collec: 'shared' })
        switch (method) {
            case 'POST':
                const { addressee, origin, _id } = body
                const result = await collection.updateOne({ addressee, origin }, { $pull: { sharedItems: new ObjectId(_id) } })
                console.log('are', result)
                return res.status(200).json(result)
            default:
                return res.status(405).json({ error: { code: 405, message: 'Method not allowed' } })
        }
    } catch (error) {
        return res.status(500).json({ error: { code: 500, message: error.message } })
    }
}