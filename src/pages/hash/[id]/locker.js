import { copy } from "@/components/hashTextCard"
import { LockerCards } from "@/components/lockerCard"
import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { sendDecrypt, sendEncrypt, sendText } from "@/requests/requests"
import { Add, Key, Lock, Password } from "@mui/icons-material"
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, LinearProgress, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
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
    const lockerss = JSON.parse(lockers)
    const { memory: { dialog, selectedLocker, key }, setStored } = StoredContext()
    const handleSubmit = () => {
        setStored({ dialog: false })
        toast.promise(sendDecrypt({ text: selectedLocker, secret_key: key }), {
            success: (data) => {
                if (data.error) return `${data.error.message}`
                copy(data.decrypted)
                return `${data.message}`
            },
            error: 'Error al desencriptar',
            loading: 'Desencriptando'
        }, {
            success: { icon: false, duration: 4000 }
        })
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
                <Fab variant="extended" sx={{ position: 'absolute', bottom: 100 }}>
                    <Add sx={{ mr: 1 }} />
                    Añadir nuevo
                </Fab>
            </Link>
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
                    <Button onClick={handleSubmit}>Desbloquear</Button>
                </DialogActions>
            </Dialog>
            {lockerss.length !== 0 ?
                (<LockerCards lockers={lockerss}></LockerCards>) :
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

