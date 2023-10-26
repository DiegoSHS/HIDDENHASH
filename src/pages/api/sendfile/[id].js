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

async function readAndWriteFile(singleImg, newPath, query) {
    try {
        const data = await readFile(singleImg.filepath)
        await writeFile(`${newPath}/${singleImg.originalFilename}`, data)
        const formData = new FormData()
        formData.append('file', new Blob([data], { type: 'appicaiton/octet-stream' }), singleImg.originalFilename)
        formData.append('type', JSON.stringify({ len: query[0], dig: query[1], lw: query[2], up: query[3], sp: query[4], ct: query[5] }))
        const send = await fetch(`http://127.0.0.1:8000/bruteforce/`, {
            method: 'POST',
            body: formData
        })
        const pass = await send.json()
        await unlink(`${newPath}/${singleImg.originalFilename}`)
        return pass
    } catch (error) {
        console.log(error.message)
    }
}

export default async function (req, res) {
    const { query: { id } } = req
    const [fields, files] = await formidableParse(req)
    const allFiles = files.files
    const passwords = []
    allFiles.forEach(async f => {
        const pass = readAndWriteFile(f, './public/uploads', id.split('-'))
        passwords.push(pass)
    })
    const results = await Promise.allSettled(passwords)
    const values = results.map(e => e.value)
    if (values.length === 0) {
        return res.status(200).json({ error: { code: 200, message: 'Intentalo de nuevo' } })
    }
    if (results.every(e => e.status === 'fulfilled')) {
        return res.status(200).json(values[0])
    }
}