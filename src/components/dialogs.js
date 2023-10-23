import { StoredContext } from "@/context/context"
import { handleShare, sendDecrypt } from "@/requests/requests"
import toast from "react-hot-toast"
import { copy } from "./hashTextCard"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material"
import { ShareWith } from "./shareAccordion"

export const UnlockDialog = () => {
    const { memory: { selectedLocker, key, dialog }, setStored } = StoredContext()
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
    const handleClose = () => {
        setStored({ dialog: false })
    }
    const handleKey = (e) => {
        setStored({ key: e.target.value })
    }
    return (
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
    )
}

export const DeleteDialog = () => {
    const { memory: { deleteDialog, selectedLocker, storedLockers, key } } = StoredContext()
    const handleSubmit = async () => {
        setStored({ deleteDialog: false })
        const res = await sendDecrypt({ text: selectedLocker.encrypted, secret_key: key })
        if (!res.error) {
            toast.promise(sendDeleter(selectedLocker._id), {
                success: (data) => {
                    if (data.error) return `${data.error.message}`
                    setStored({ storedLockers: { personal: storedLockers.personal.filter(e => e._id !== selectedLocker._id) } })
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
    const handleClose = () => {
        setStored({ deleteDialog: false })
    }
    const handleKey = (e) => {
        setStored({ key: e.target.value })
    }
    return (
        <Dialog open={deleteDialog} onClose={handleClose} maxWidth='sm'>
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
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleSubmit} disabled={key == '' || key.length <= 7}>Eliminar</Button>
            </DialogActions>
        </Dialog>
    )
}

export const ShareDialog = () => {
    const { memory: { shareDialog, selectedLocker, storedUsers, user: { email } } } = StoredContext()
    const handleClose = () => {
        setStored({ shareDialog: false })
    }
    return (
        <Dialog open={shareDialog} onClose={handleClose} maxWidth='sm' >
            <DialogTitle>Enviar a</DialogTitle>
            <DialogContent>
                {storedUsers.length !== 0 ?
                    (storedUsers.map((e, i) => {
                        return (
                            <ShareWith user={e} selected={selectedLocker} handler={handleShare} origin={email} key={i} />
                        )
                    })) :
                    (<Typography>No hay nadie con quien copartir aún</Typography>)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Terminar</Button>
            </DialogActions>
        </Dialog>
    )
}
