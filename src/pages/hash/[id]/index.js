import { HashTextCards } from "@/components/hashTextCard"
import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { Add } from "@mui/icons-material"
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
    const { memory: { storedHashes }, setStored } = StoredContext()
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
                <Link href={`/hash/`} legacyBehavior passHref>
                    <Fab variant="extended" sx={{ position: 'fixed', bottom: 100 }}>
                        <Add sx={{ mr: 1 }} />
                        Nuevo hash
                    </Fab>
                </Link>
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

