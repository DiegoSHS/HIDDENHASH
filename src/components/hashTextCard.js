import { StoredContext } from "@/context/context"
import { deleter, save } from "@/requests/requests"
import { Check, CopyAll, Delete, Save } from "@mui/icons-material"
import { Card, CardActions, CardContent, CardHeader, Container, IconButton, Typography } from "@mui/material"
import { useState } from "react"
import toast from "react-hot-toast"

export const copy = async (text) => {
    await navigator.clipboard.writeText(text)
}

export const HashTextCards = ({ hashes }) => {
    if (hashes.length === 0) return ('')
    return (
        hashes.map(e => <HashTextCard element={e}></HashTextCard>)
    )
}

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
        <Card sx={{ background: 'transparent', maxWidth: '85vw' }}>
            <CardHeader
                title={original}
                subheader={algorithm}
            />
            <CardContent>
                <Typography overflow={'clip'} variant="body2" color="text.secondary">
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
