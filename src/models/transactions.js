export const getlockers = async (collection, filter) => collection.find(filter).toArray()

export const saveHash = async (collection, body) => collection.insertOne(body)