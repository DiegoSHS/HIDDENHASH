import { copy } from "@/components/hashTextCard"
import { LockerCards } from "@/components/lockerCard"
import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { sendDecrypt, sendDeleter, sendEncrypt, sendText } from "@/requests/requests"
import { Add, Key, Lock, Password } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, LinearProgress, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react"
import toast from "react-hot-toast"

export const getServerSideProps = async ({ query: { id } }) => {
    const collection = connex({})
    const lockers = await getlockers(collection, { email: id })
    return {
        props: {
            lockers: JSON.stringify(lockers)
        }
    }
}

export default function Locker({ lockers }) {
    const { memory: { dialog, deleteDialog, selectedLocker, storedLockers, key }, setStored } = StoredContext()
    useEffect(() => { setStored({ storedLockers: JSON.parse(lockers) }) }, [])
    const handleSubmit = () => {
        setStored({ dialog: false })
        toast.promise(sendDecrypt({ text: selectedLocker, secret_key: key }), {
            success: (data) => {
                if (data.error) return `${data.error.message}`
                copy(data.decrypted)
                setStored({ selectedLocker: '' })
                return `${data.message}`
            },
            error: 'Error al desencriptar',
            loading: 'Desencriptando'
        }, {
            success: { icon: false, duration: 4000 }
        })
        setStored({ key: '' })
    }
    const handleSubmitDel = async () => {
        setStored({ deleteDialog: false })
        const res = await sendDecrypt({ text: selectedLocker.encrypted, secret_key: key })
        if (!res.error) {
            toast.promise(sendDeleter(selectedLocker._id), {
                success: (data) => {
                    if (data.error) return `${data.error.message}`
                    setStored({ storedLockers: storedLockers.filter(e => e._id !== selectedLocker._id) })
                    setStored({ selectedLocker: '' })
                    return `Eliminado`
                },
                error: 'Error al eliminar',
                loading: 'Eliminando'
            }, {
                success: { icon: false, duration: 2000 }
            })
            setStored({ key: '' })
            return
        }
        toast.error(`${res.error.message}`)
    }
    const handleCloseDel = () => {
        setStored({ deleteDialog: false })
    }
    const handleClose = () => {
        setStored({ dialog: false })
    }
    const handleKey = (e) => {
        setStored({ key: e.target.value })
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Box sx={{
                display: 'flex',
            }}>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Key color="warning" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Password color="secondary" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Lock color="warning" />
                </Avatar>
            </Box>
            <Typography component="h1" variant="h5">
                Encripta texto
            </Typography>
            <Typography variant="body2" textAlign='center' sx={{ mt: 1 }}>
                Encripta un texto con una clave y un algoritmo robusto, solo se podrá acceder con la clave
            </Typography>
            <Typography variant="body2" color='warning.main'>
                ¡No la olvides!
            </Typography>
            <Link href={`/hash/newlocker`} legacyBehavior passHref>
                <Fab variant="extended" sx={{ position: 'fixed', bottom: 100 }}>
                    <Add sx={{ mr: 1 }} />
                    Añadir nuevo
                </Fab>
            </Link>
            <Dialog open={deleteDialog} onClose={handleCloseDel} maxWidth='sm'>
                <DialogTitle>Eliminar elemento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Escribe la contraseña con la que guardaste este texto
                    </DialogContentText>
                    <DialogContentText variant="caption" sx={{ mt: 1 }}>
                        Si la contraseña es correca se eliminará este elemento
                    </DialogContentText>
                    <TextField
                        onChange={handleKey}
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDel}>Cancelar</Button>
                    <Button onClick={handleSubmitDel} disabled={key == '' || key.length <= 7}>Eliminar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={dialog} onClose={handleClose} maxWidth='sm'>
                <DialogTitle>Desbloquear elemento</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Escribe la contraseña con la que guardaste este texto
                    </DialogContentText>
                    <DialogContentText variant="caption" sx={{ mt: 1 }}>
                        Si se desencripta con éxito entonces el texto se copiará al portapapeles automaticamente
                    </DialogContentText>
                    <TextField
                        onChange={handleKey}
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Contraseña"
                        type="password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSubmit} disabled={key == '' || key.length <= 7}>Desbloquear</Button>
                </DialogActions>
            </Dialog>
            {storedLockers.length !== 0 ?
                (<Container maxWidth='sm'><LockerCards lockers={storedLockers}></LockerCards></Container>) :
                (
                    <NoContent>
                        <Link href={'/hash/personal'}>
                            <Button variant="contained">
                                Volver
                            </Button>
                        </Link>
                    </NoContent>
                )

            }
        </Box >
    )
}

