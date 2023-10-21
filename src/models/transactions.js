import { ObjectId } from "mongodb"

export const getlockers = async (collection, filter) => collection.find(filter).toArray()

export const getLocker = async (collection, filter) => collection.findOne(filter)

export const saveHash = async (collection, body) => collection.insertOne(body)

export const deleteHash = async (collection, _id) => collection.deleteOne({ _id: new ObjectId(_id) })

export const getHash = async (collection, _id) => collection.findOne({ _id: new ObjectId(_id) })