import { NoContent } from "@/components/noContent"
import { ShareAccordion } from "@/components/shareAccordion"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { ArrowBack, ArrowRightAlt, Share, Tag } from "@mui/icons-material"
import { Avatar, Box, Fab, Typography } from "@mui/material"
import Link from "next/link"

export const getServerSideProps = async ({ query: { id } }) => {
    const collection = connex({ collec: 'shared' })
    const sharedItems = await collection.aggregate([
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
    return {
        props: {
            shared: JSON.stringify(sharedItems)
        }
    }
}

export default function Shared({ shared }) {
    const { memory: { user: { email } } } = StoredContext()
    const sharedHashes = JSON.parse(shared)
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: 'flex',
            }}>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Share color="secondary" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <ArrowRightAlt color="info" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Tag color="secondary" />
                </Avatar>
            </Box>
            <Typography component="h1" variant="h5">
                Compartidos conmigo
            </Typography>
            <Typography variant="body2" textAlign='center' sx={{ mt: 1 }}>
                Accede a hashes que han compartido contigo
            </Typography>
            {sharedHashes.length !== 0 ?
                (sharedHashes.map(ShareAccordion)) :
                (<NoContent>
                </NoContent>)
            }
            <Box sx={{ position: 'fixed', bottom: 100 }}>
                <Link href={`/hash/${email}`} passHref legacyBehavior>
                    <Fab size="medium" variant="extended" sx={{ m: 1 }}>
                        <ArrowBack sx={{ mr: 1 }} /> Volver
                    </Fab>
                </Link>
            </Box>
        </Box>
    )
}