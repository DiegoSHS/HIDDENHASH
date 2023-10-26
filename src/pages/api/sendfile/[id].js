import { IncomingForm } from "formidable"
import { readFile, unlink, writeFile } from "fs/promises"

const formidableParse = async (req) =>
    new Promise((resolve, reject) =>
        new IncomingForm().parse(req, (err, fields, files) => err ? reject(err) : resolve([fields, files]))
    )

export const config = {
    api: {
        bodyParser: false
    }
}

async function readAndWriteFile({ originalFilename, filepath }, newPath, query) {
    try {
        const path = `${newPath}/${originalFilename}`
        const data = await readFile(filepath)
        await writeFile(path, data)
        const formData = new FormData()
        formData.append('file', new Blob([data], { type: 'appicaiton/octet-stream' }), originalFilename)
        formData.append('type', JSON.stringify({ len: query[0], dig: query[1], lw: query[2], up: query[3], sp: query[4], ct: query[5] }))
        const send = await fetch(`http://127.0.0.1:8000/bruteforce/`, {
            method: 'POST',
            body: formData
        })
        const pass = await send.json()
        await unlink(path)
        return pass
    } catch (error) {
        console.log(error.message)
    }
}

export default async function (req, res) {
    const { query: { id } } = req
    const [_, { files }] = await formidableParse(req)
    const passwords = files.map(async file => readAndWriteFile(file, './public/uploads', id.split('-')))
    const results = await Promise.allSettled(passwords)
    const values = results.map(({ value }) => value)
    if (values.length === 0) {
        return res.status(200).json({ error: { code: 200, message: 'Intentalo de nuevo' } })
    }
    if (results.every(({ status }) => status === 'fulfilled')) {
        return res.status(200).json(values[0])
    } else {
        return res.status(408).json({ error: { code: 408, message: 'Tardó demasiado la respuesta' } })
    }
}