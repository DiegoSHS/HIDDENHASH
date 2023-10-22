import { HashTextCards } from "@/components/hashTextCard"
import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { Add, ArrowBack, Inbox, Share } from "@mui/icons-material"
import { Box, Button, Container, Fab } from "@mui/material"
import Link from "next/link"
import { useEffect } from "react"

export const getServerSideProps = async ({ query: { id } }) => {
    const collection = connex({ collec: 'hashes' })
    const hashes = await getlockers(collection, { email: id })
    return {
        props: {
            hashes: JSON.stringify(hashes)
        }
    }
}

export default function Hashes({ hashes }) {
    const { memory: { storedHashes, user: { email } }, setStored } = StoredContext()
    useEffect(() => {
        setStored({ storedHashes: JSON.parse(hashes) })
    }, [])
    return (storedHashes.length !== 0 ?
        (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Box sx={{ position: 'fixed', bottom: 100 }}>
                    <Link href={`/hash/personal`} passHref legacyBehavior>
                        <Fab sx={{ m: 1 }} size="medium">
                            <ArrowBack />
                        </Fab>
                    </Link>
                    <Link href={`/hash/${email}/newhash`} passHref legacyBehavior>
                        <Fab sx={{ m: 1 }} size="medium">
                            <Add />
                        </Fab>
                    </Link>
                    <Link href={`/share/${email}`} passHref legacyBehavior>
                        <Fab sx={{ m: 1 }} size="medium">
                            <Share />
                        </Fab>
                    </Link>
                    <Link href={`/share/${email}/mine`} passHref legacyBehavior>
                        <Fab sx={{ m: 1 }} size="medium">
                            <Inbox />
                        </Fab>
                    </Link>
                </Box>
                <Container maxWidth='sm'><HashTextCards hashes={storedHashes} /></Container>
            </Box>) :
        (
            <NoContent>
                <Link href={'/hash/personal'}>
                    <Button variant="contained">
                        Volver
                    </Button>
                </Link>
            </NoContent>
        )
    )
}

