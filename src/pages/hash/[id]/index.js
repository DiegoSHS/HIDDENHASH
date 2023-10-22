import { HashTextCards } from "@/components/hashTextCard"
import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { Add, Inbox, Share, Tag } from "@mui/icons-material"
import { Box, Button, Container, Fab, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
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
                    <SpeedDial
                        color="error"
                        ariaLabel="Opciones para compartir"
                        icon={<Tag />}
                    >
                        <SpeedDialAction
                            key='Compartir'
                            icon={
                                <Link href={`/share/${email}`} legacyBehavior passHref>
                                    <Share />
                                </Link>
                            }
                            tooltipTitle='Compartir'
                        />
                        <SpeedDialAction
                            key='Compartidos'
                            icon={
                                <Link href={`/share/${email}/mine`} legacyBehavior passHref>
                                    <Inbox />
                                </Link>
                            }
                            tooltipTitle='Compartidos conmigo'
                        />
                        <SpeedDialAction
                            key='Nuevo'
                            icon={
                                <Link href={`/hash/`} legacyBehavior passHref>
                                    <Add />
                                </Link>
                            }
                            tooltipTitle='Nuevo'
                        />
                    </SpeedDial>
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

