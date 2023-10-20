import { StoredContext } from "@/context/context"
import { save } from "@/requests/requests"
import { Check, CopyAll, Save } from "@mui/icons-material"
import { Card, CardActions, CardContent, CardHeader, Container, IconButton, Typography } from "@mui/material"
import { useState } from "react"

export const copy = async (text) => {
    await navigator.clipboard.writeText(text)
}

export const HashTextCards = ({ hashes }) => {
    if (hashes.length === 0) return ('')
    return (
        hashes.map(e => <HashTextCard element={e}></HashTextCard>)
    )
}

export const HashTextCard = ({ element: { hash, algorithm, original, _id } }) => {
    const [saved, setSaved] = useState(0)
    const { memory: { user: { email }, storedHashes }, setStored } = StoredContext()
    const handleSave = async () => {
        const res = await save({ hash, algorithm, original, email })
        if (!res.error) {
            setSaved(true)
            setStored({ storedHashes: [...storedHashes, res] })
        }
    }

    return (
        <Card sx={{ background: 'transparent' }}>
            <CardHeader
                title={original}
                subheader={algorithm}
            />
            <CardContent>
                <Typography maxWidth={'85vw'} overflow={'clip'} variant="body2" color="text.secondary">
                    {hash}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {!_id && (
                    <IconButton disabled={!email || saved} onClick={handleSave} aria-label="add to favorites">
                        {saved ? <Check /> : <Save />}
                    </IconButton>
                )}
                <IconButton onClick={() => { copy(hash) }} aria-label="share">
                    <CopyAll />
                </IconButton>
            </CardActions>
        </Card>
    )
}
