import { copy } from "@/components/hashTextCard"
import { LockerCards } from "@/components/lockerCard"
import { NoContent } from "@/components/nocontent"
import { ShareAccordion, ShareWith } from "@/components/shareAccordion"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { getSessions, handleShare, sendDecrypt, sendDeleter, sendEncrypt, sendText } from "@/requests/requests"
import { Add, ArrowBack, Key, Lock, Password } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react"
import toast from "react-hot-toast"

export const getServerSideProps = async ({ query: { id } }) => {
    const collection = connex({})
    const personal = await getlockers(collection, { email: id })
    const shared = await collection.aggregate([
        {
            $match: { addressee: id }
        },
        {
            $lookup: {
                from: "hashes",
                localField: "sharedItems",
                foreignField: "_id",
                as: "sharedItems"
            }
        }
    ]).toArray()
    const lockers = { personal, shared }

    return {
        props: {
            lockers: JSON.stringify(lockers)
        }
    }
}

export default function Locker({ lockers }) {
    const { memory: { dialog, deleteDialog, shareDialog, selectedLocker, storedLockers, key, storedUsers, user: { email } }, setStored } = StoredContext()
    const getter = async () => {
        const res = await getSessions()
        if (res.error) {
            return
        }
        const users = res.filter(e => e.email !== email)
        setStored({ storedUsers: users })
    }
    useEffect(() => {
        setStored({ storedLockers: JSON.parse(lockers) })
        getter()
    }, [])
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
    const handleCloseSha = () => {
        setStored({ shareDialog: false })
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
            <Dialog open={shareDialog} onClose={handleCloseSha} maxWidth='sm' >
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
                    <Button onClick={handleCloseSha}>Terminar</Button>
                </DialogActions>
            </Dialog>
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
            {
                storedLockers.shared.map((e) => {
                    return (
                        <Accordion sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '85vw' }}>
                            <AccordionSummary expandIcon={<ExpandMore />} id="sharedFrom">
                                <Typography>Compartido por: {origin}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Container maxWidth='sm'>
                                    <HashSharedCards key={_id} hashes={sharedItems} shareInfo={{
                                        addressee: addressee,
                                        origin: origin
                                    }} />
                                </Container>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            }
            {storedLockers.personal.length !== 0 ?
                (<Container maxWidth='sm'><LockerCards lockers={storedLockers.personal}></LockerCards></Container>) :
                (
                    <NoContent>
                    </NoContent>
                )

            }
            <Box sx={{ position: 'fixed', bottom: 100 }}>
                <Link href={`/hash/personal`} legacyBehavior passHref>
                    <Fab size="medium" sx={{ m: 1 }}>
                        <ArrowBack />
                    </Fab>
                </Link>
                <Link href={`/hash/newlocker`} legacyBehavior passHref>
                    <Fab size="medium" sx={{ m: 1 }}>
                        <Add />
                    </Fab>
                </Link>
            </Box>
        </Box >
    )
}

