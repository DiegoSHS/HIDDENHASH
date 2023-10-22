import { DeleteDialog, ShareDialog, UnlockDialog } from "@/components/dialogs"
import { LockerCards } from "@/components/lockerCard"
import { NoContent } from "@/components/noContent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { getSessions } from "@/requests/requests"
import { Add, ArrowBack, Inbox, Key, Lock, Password } from "@mui/icons-material"
import { Avatar, Box, Container, Fab, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react"

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
    const { memory: { storedLockers, user: { email } }, setStored } = StoredContext()
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
                Mis lockers
            </Typography>
            <Typography variant="body2" textAlign='center' sx={{ mt: 1 }}>
                Visualiza el contendio encriptado, desbloquea de forma segura y comparte con otros usuarios
            </Typography>
            <Typography variant="body2" color='warning.main'>
                Solo comparte con alguien de confianza
            </Typography>
            <UnlockDialog />
            <DeleteDialog />
            <ShareDialog />
            {storedLockers.length !== 0 ?
                (
                    <Container maxWidth='sm'>
                        <LockerCards lockers={storedLockers} />
                    </Container>
                ) :
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
                <Link href={`/hash/${email}/shared`} legacyBehavior passHref>
                    <Fab size="medium" sx={{ m: 1 }}>
                        <Inbox />
                    </Fab>
                </Link>
            </Box>
        </Box >
    )
}

