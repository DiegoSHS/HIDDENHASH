import { CopyAll, LockOpen, RemoveRedEye } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { useState } from 'react'
import { copy } from './hashTextCard'
import { StoredContext } from '@/context/context'

export const LockerCards = ({ lockers }) => {
    if (lockers.length === 0) return ('')
    return (
        lockers.map(e => <LockerCard element={e} />)
    )
}


export const LockerCard = ({ element: { encrypted, name, email } }) => {
    const [visible, setVisible] = useState(true)
    const { setStored } = StoredContext()
    const handleVisible = () => {
        setVisible(!visible)
    }
    const handleOpen = () => {
        setStored({ selectedLocker: encrypted })
        setStored({ dialog: true })
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
                    <RemoveRedEye color={visible ? 'secondary' : 'error'} />
                </IconButton>
                <IconButton disabled={visible} aria-label="copiar" onClick={() => copy(encrypted)}>
                    <CopyAll />
                </IconButton>
            </CardActions>
        </Card>
    )
}
