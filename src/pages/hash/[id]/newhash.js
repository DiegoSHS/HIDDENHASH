import React from 'react'
import Createhash from '..'
import { Box, Fab } from '@mui/material'
import Link from 'next/link'
import { ArrowBack } from '@mui/icons-material'
import { StoredContext } from '@/context/context'
import { getHashes } from "crypto"

export const getServerSideProps = () => {
    const algorithms = getHashes()
    return {
        props: {
            algorithms
        }
    }
}

export default function NewHash({ algorithms }) {
    const { memory: { user: { email } } } = StoredContext()
    return (
        <Createhash algorithms={algorithms}>
            <Box sx={{ position: 'fixed', bottom: 100 }}>
                <Link href={`/hash/${email}/`} legacyBehavior passHref>
                    <Fab size="medium" variant="extended" sx={{ m: 1 }}>
                        <ArrowBack sx={{ mr: 1 }} />Volver
                    </Fab>
                </Link>
            </Box>
        </Createhash>
    )
}
