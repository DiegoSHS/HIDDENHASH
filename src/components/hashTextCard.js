import { StoredContext } from "@/context/context"
import { deleteShared, deleter, save } from "@/requests/requests"
import { Check, CopyAll, Delete, Save } from "@mui/icons-material"
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import toast from "react-hot-toast"
export const copy = async (text) => {
    await navigator.clipboard.writeText(text)
}

export const HashTextCards = ({ hashes }) => hashes.map((e, i) => <HashTextCard element={e} key={i} />)

export const HashTextCard = ({ element: { hash, algorithm, original, _id } }) => {
    const [saved, setSaved] = useState(0)
    const { memory: { user: { email }, storedHashes }, setStored } = StoredContext()
    const handleSave = async () => {
        toast.promise(save({ hash, algorithm, original, email }), {
            error: (data) => `${data.error.message}`,
            success: (data) => {
                if (data.error) {
                    return `${data.error.message}`
                }
                setSaved(true)
                return 'Guardado en hashes'
            },
            loading: 'Guardando'
        }, {
            success: { icon: false }
        })
    }
    const handleDelete = () => {
        toast.promise(deleter(_id), {
            error: `Error al solicitar eliminación`,
            success: (data) => {
                if (data.error) {
                    return `Error en el servidor`
                }
                setStored({ storedHashes: storedHashes.filter(e => e._id !== _id) })
                return 'Eliminado'
            },
            loading: 'Eliminando'
        }, {
            success: { icon: false }
        })
    }
    return (
        <Card sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '95vw' }}>
            <CardHeader
                title={original}
                subheader={algorithm}
            />
            <CardContent>
                <Typography sx={{ overflow: 'hidden', maxWidth: '95%' }} variant="body2" color="text.secondary">
                    {hash}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {!_id && (
                    <IconButton disabled={!email || saved} onClick={handleSave} aria-label="Guardar">
                        {saved ? <Check /> : <Save />}
                    </IconButton>
                )}
                {
                    _id && (
                        <IconButton onClick={handleDelete} aria-label="copiar">
                            <Delete color="error" />
                        </IconButton>
                    )
                }
                <IconButton onClick={() => { copy(hash) }} aria-label="copiar">
                    <CopyAll />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export const HashSharedCards = ({ hashes, shareInfo }) => {
    const [hashess, setHashess] = useState(hashes)
    if (hashess.length === 0) {
        return (<Typography>Nada compartido</Typography>)
    }
    return (
        hashess.map((e, i) => <HashSharedCard element={e} shareInfo={shareInfo} key={i} stateFn={setHashess}></HashSharedCard>)
    )
}

export const HashSharedCard = ({ element: { hash, algorithm, original, _id }, shareInfo: { addressee, origin }, stateFn }) => {
    const handleDelete = () => {
        toast.promise(deleteShared({ addressee, origin, _id }), {
            error: `Error al solicitar eliminación`,
            success: (data) => {
                if (data.error) {
                    return `Error en el servidor`
                }
                stateFn((state) => state.map(e => e._id !== _id))
                return 'Eliminado de compartidos'
            },
            loading: 'Eliminando'
        }, {
            success: { icon: false }
        })
    }
    return (
        <Card sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '95vw' }}>
            <CardHeader
                title={original}
                subheader={algorithm}
            />
            <CardContent>
                <Typography sx={{ overflow: 'hidden', maxWidth: '95%' }} variant="body2" color="text.secondary">
                    {hash}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton onClick={handleDelete} aria-label="copiar">
                    <Delete color="error" />
                </IconButton>
                <IconButton onClick={() => { copy(hash) }} aria-label="copiar">
                    <CopyAll />
                </IconButton>
            </CardActions>
        </Card>
    )
}
