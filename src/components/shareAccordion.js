import { Accordion, AccordionDetails, AccordionSummary, Card, CardActions, CardContent, CardHeader, Container, Fab, IconButton, Typography } from "@mui/material"
import { HashSharedCards } from "./hashTextCard"
import { CopyAll, Delete, ExpandMore, LockOpen, RemoveRedEye, Send } from "@mui/icons-material"
import { useState } from "react"
import { StoredContext } from "@/context/context"
import { deleteShared } from "@/requests/requests"
import toast from "react-hot-toast"

export const ShareAccordion = ({ origin, sharedItems, addressee, _id }) => {
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
}

export const LockerAccordion = ({ addressee, origin, sharedItems }) => {
    return (
        <Accordion sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '85vw' }}>
            <AccordionSummary expandIcon={<ExpandMore />} id="sharedFrom">
                <Typography>Compartido por: {origin}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Container maxWidth='sm'>
                    <LockerSharedCards lockers={sharedItems} shareInfo={{
                        addressee: addressee,
                        origin: origin
                    }} />
                </Container>
            </AccordionDetails>
        </Accordion>
    )
}

export const ShareWith = ({ user: { name, email }, selected, origin, handler }) => {
    return (
        <Fab variant="extended" size="small" sx={{ maxWidth: '100%', minWidth: '100%', my: 1 }} onClick={() => {
            handler({ origin: origin, sharedItems: selected, addressee: email })
        }}>
            {name}<Send sx={{ ml: 1 }} />
        </Fab>
    )
}

const LockerSharedCards = ({ lockers, shareInfo }) => {
    const [lockerss, setLockerss] = useState(lockers)
    if (!lockerss || lockerss.length === 0) return (<Typography>Nada compartido</Typography>)
    return (
        lockerss.map((e, i) => <LockerSharedCard element={e} sharedInfo={shareInfo} key={i} stateFn={setLockerss} />)
    )
}

const LockerSharedCard = ({ element: { encrypted, name, email, _id }, sharedInfo: { origin, addressee }, stateFn }) => {
    const [deleted, setDeleted] = useState(false)
    const [visible, setVisible] = useState(true)
    const { setStored } = StoredContext()
    const handleDelete = () => {
        toast.promise(deleteShared({ addressee, origin, _id }), {
            error: `Error al solicitar eliminación`,
            success: (data) => {
                if (data.error) {
                    return `Error en el servidor`
                }
                stateFn((state) => state.map(e => e._id !== _id))
                setDeleted(true)
                return 'Eliminado de compartidos'
            },
            loading: 'Eliminando'
        }, {
            success: { icon: false }
        })
    }
    const handleVisible = () => {
        setVisible(!visible)
    }
    const handleOpen = () => {
        setStored({ selectedLocker: encrypted })
        setStored({ dialog: true })
    }
    return (
        deleted ? (<></>) :
            (
                <Card sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '85vw' }}>
                    <CardHeader
                        title={name}
                        subheader={`Dueño: ${email}`}
                    />
                    <CardContent>
                        <Typography hidden={visible} overflow={'clip'} variant="body2" color="text.secondary">
                            {encrypted}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="desbloquear" onClick={handleOpen}>
                            <LockOpen />
                        </IconButton>
                        <IconButton aria-label="ver encriptado" onClick={handleVisible}>
                            <RemoveRedEye color={visible ? 'secondary' : 'warning'} />
                        </IconButton>
                        <IconButton disabled={visible} aria-label="copiar" color='info' onClick={() => copy(encrypted)}>
                            <CopyAll />
                        </IconButton>
                        <IconButton disabled={visible} aria-label="copiar" color='error' onClick={handleDelete}>
                            <Delete />
                        </IconButton>
                    </CardActions>
                </Card>
            )
    )
}
