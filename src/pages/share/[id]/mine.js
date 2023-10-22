import { HashSharedCards, HashTextCards } from "@/components/hashTextCard"
import { NoContent } from "@/components/nocontent"
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
                    sharedHashes.map(e => {
                        return (
                            <Accordion sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '85vw' }}>
                                <AccordionSummary expandIcon={<ExpandMore />} id="sharedFrom">
                                    <Typography>Compartido por: {e.origin}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Container maxWidth='sm'>
                                        <HashSharedCards key={e._id} hashes={e.sharedItems} shareInfo={{
                                            addressee: e.addressee,
                                            origin: e.origin
                                        }} />
                                    </Container>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
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