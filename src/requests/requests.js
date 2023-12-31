import toast from "react-hot-toast"

const postRequest = async (route, body) => {
    try {
        const res = await fetch(route, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await res.json()
        return data
    } catch (error) {
        return {
            error: { code: 500, message: `Error al realizar petición ${error.message}` }
        }
    }
}

const postFileRequest = async (route, FormData) => {
    try {
        const res = await fetch(route, {
            method: 'POST',
            body: FormData
        })
        const data = await res.json()
        return data
    } catch (error) {
        return {
            error: { code: 500, message: `Error al realizar petición ${error.message}` }
        }
    }
}

const deleteRequest = async (route) => {
    try {
        const res = await fetch(route, {
            method: 'DELETE'
        })
        const data = await res.json()
        return data
    } catch (error) {
        return {
            error: { code: 500, message: `Error al realizar petición ${error.message}` }
        }
    }
}

const getRequest = async (route) => {
    try {
        const res = await fetch(route, {
            method: 'GET'
        })
        const data = await res.json()
        return data
    } catch (error) {
        return { code: 500, error: { message: `Error al realizar petición: ${error.message}` } }
    }
}

export const handleShare = (share) => {
    toast.promise(sendShared(share), {
        success: (data) => {
            if (data.error) {
                return `${data.error.message}`
            }
            return 'Compartido!'
        },
        error: 'Error al enviar',
        loading: 'Compartiendo'
    }, {
        success: { icon: false }
    })
}

export const sendText = (body) => postRequest('/api/hash', body)

export const sendEncrypt = (body) => postRequest('/api/encrypt', body)

export const sendDecrypt = (body) => postRequest('/api/decrypt', body)

export const sendDeleter = (_id) => deleteRequest(`/api/locker/${_id}`)

export const save = (body) => postRequest('/api/hash/save', body)

export const deleter = (_id) => deleteRequest(`/api/hash/${_id}`)

export const sendSession = (body) => postRequest('/api/session', body)

export const getSessions = () => getRequest('/api/session')

export const sendShared = (body) => postRequest('/api/share', body)

export const deleteShared = (body) => postRequest('/api/share/deleteshared', body)

export const sendFile = (file, query) => {
    const route = Object.entries(query).map(([k, v]) => {
        return String(v)
    }).join('-')
    return postFileRequest(`/api/sendfile/${route}`, file)
}