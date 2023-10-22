import { NoContent } from "@/components/nocontent"
import { ShareAccordion } from "@/components/shareAccordion"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { ArrowBack } from "@mui/icons-material"
import { Box, Button, Fab } from "@mui/material"
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
    return (sharedHashes.length !== 0 ?
        (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {
                    sharedHashes.map(ShareAccordion)
                }
                <Box sx={{ position: 'fixed', bottom: 100 }}>
                    <Link href={`/hash/${email}`} passHref legacyBehavior>
                        <Fab size="medium" sx={{ m: 1 }}>
                            <ArrowBack />
                        </Fab>
                    </Link>
                </Box>
            </Box>
        ) :
        (
            <NoContent>
                <Link href={`/hash/${email}`} passHref legacyBehavior>
                    <Button variant="contained">
                        Volver
                    </Button>
                </Link>
            </NoContent>
        )
    )
}