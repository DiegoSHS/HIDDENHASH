import { HashSharedCards, HashTextCards } from "@/components/hashTextCard"
import { NoContent } from "@/components/nocontent"
import { ShareAccordion } from "@/components/shareAccordion"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { ExpandMore, More } from "@mui/icons-material"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Typography } from "@mui/material"
import Link from "next/link"

export const getServerSideProps = async ({ query: { id } }) => {
    const collection = connex({ collec: 'shared' })
    const sharedItems = await collection.aggregate([
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
    sharedHashes.map(e => { console.log(e) })
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




const handleDelShared = () => {
    toast.promise(deleteShared({ addressee: '', origin: '', _id }))
}