import { HashTextCards } from "@/components/hashTextCard"
import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { Add, Share } from "@mui/icons-material"
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

export default function Locker({ hashes }) {
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
                    <Link href={`/hash/`} legacyBehavior passHref>
                        <Fab variant="extended" sx={{ m: 1 }}>
                            <Add sx={{ mr: 1 }} />
                            Nuevo hash
                        </Fab>
                    </Link>
                    <Link href={`/share/${email}`} legacyBehavior passHref>
                        <Fab variant="extended" sx={{ m: 1 }}>
                            <Share sx={{ mr: 1 }} />
                            Compartir
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

