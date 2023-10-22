import { CopyAll, Delete, LockOpen, RemoveRedEye, Share } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { copy } from './hashTextCard'
import { StoredContext } from '@/context/context'

export const LockerCards = ({ lockers }) => {
    if (lockers.length === 0) return ('')
    return (
        lockers.map((e, i) => <LockerCard element={e} key={i} />)
    )
}

export const LockerCard = ({ element: { encrypted, name, email, _id } }) => {
    const [visible, setVisible] = useState(true)
    const { setStored } = StoredContext()
    const handleVisible = () => {
        setVisible(!visible)
    }
    const handleOpen = () => {
        setStored({ selectedLocker: encrypted })
        setStored({ dialog: true })
    }
    const handleDelete = () => {
        setStored({ selectedLocker: { _id, encrypted } })
        setStored({ deleteDialog: true })
    }
    const handleShare = () => {
        setStored({ selectedLocker: _id })
        setStored({ shareDialog: true })
    }
    return (
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
                <IconButton aria-label="ver encriptado" onClick={handleShare}>
                    <Share />
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
}
