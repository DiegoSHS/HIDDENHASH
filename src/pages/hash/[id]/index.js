import { HashTextCards } from "@/components/hashTextCard"
import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { Box, Button } from "@mui/material"
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
        (<HashTextCards hashes={storedHashes} />) :
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

