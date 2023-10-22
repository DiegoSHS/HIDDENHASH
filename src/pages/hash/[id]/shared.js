import { UnlockDialog } from "@/components/dialogs"
import { NoContent } from "@/components/noContent"
import { LockerAccordion } from "@/components/shareAccordion"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { ArrowBack, ArrowRightAlt, KeySharp, Share } from "@mui/icons-material"
import { Avatar, Box, Fab, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react"

export const getServerSideProps = async ({ query: { id } }) => {
    const collection = connex({ collec: 'shared' })
    const shared = await collection.aggregate([
        {
            $match: { addressee: id }
        },
        {
            $lookup: {
                from: "lockers",
                localField: "sharedItems",
                foreignField: "_id",
                as: "sharedItems"
            }
        }
    ]).toArray()
    return {
        props: {
            lockers: JSON.stringify(shared)
        }
    }
}

export default function SharedLocker({ lockers }) {
    const { memory: { storedLockers, user: { email } }, setStored } = StoredContext()
    useEffect(() => {
        setStored({ storedLockers: JSON.parse(lockers) })
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
                    <Share color="warning" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <ArrowRightAlt color="secondary" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <KeySharp color="warning" />
                </Avatar>
            </Box>
            <Typography component="h1" variant="h5">
                Compartidos conmigo
            </Typography>
            <Typography variant="body2" textAlign='center' sx={{ mt: 1 }}>
                Accede a lockers que se han compartido contigo
            </Typography>
            <Typography variant="body2" color='warning.main'>
                Solo con la clave
            </Typography>
            <UnlockDialog />
            {
                storedLockers.length !== 0 ?
                    (storedLockers.map(LockerAccordion)) :
                    (
                        <NoContent>
                        </NoContent>
                    )
            }
            <Box sx={{ position: 'fixed', bottom: 100 }}>
                <Link href={`/hash/${email}/locker`} legacyBehavior passHref>
                    <Fab size="medium" variant="extended" sx={{ m: 1 }}>
                        <ArrowBack sx={{ mr: 1 }} />Volver
                    </Fab>
                </Link>
            </Box>
        </Box>
    )
}
