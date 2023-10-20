import { HashTextCards } from "@/components/hashTextCard"
import { StoredContext } from "@/context/context"
import { sendText } from "@/requests/requests"
import { ArrowRightAlt, Tag, TextFormat } from "@mui/icons-material"
import { Avatar, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { getHashes } from "crypto"
import { useState } from "react"
export default function Createhash({ algorithms }) {
    const [hashes, setHashes] = useState([])
    const { memory: { algorithm, text, user: { email } }, setStored } = StoredContext()
    const handleChange = (e) => {
        setStored({ [e.target.name]: e.target.value })
    }
    const handleHash = (e) => {
        setStored({ algorithm: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await sendText({ algorithm, text, email })
        if (!res.error) {
            setHashes([...hashes, res])
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Box sx={{
                display: 'flex',
            }}>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <TextFormat color="secondary" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <ArrowRightAlt color="info" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Tag color="secondary" />
                </Avatar>
            </Box>
            <Typography component="h1" variant="h5">
                Hashea texto
            </Typography>
            <Typography variant="body2" textAlign='center' sx={{ mt: 1 }}>
                Obtén un texto hash con el algoritmo de tu preferencia
            </Typography>
            <Box component="form" onChange={handleChange} noValidate sx={{ mt: 1 }}>
                <TextField
                    defaultValue={text}
                    margin="normal"
                    required
                    fullWidth
                    id="text"
                    label="Texto para encriptar"
                    name="text"
                    autoFocus
                />
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="typeHashLabel">Algoritmo</InputLabel>
                    <Select
                        onChange={handleHash}
                        name="algorithm"
                        labelId="typeHashLabel"
                        id="typeHash"
                        value={algorithm}
                        label="Algoritmo"
                    >
                        {algorithms.map(e => <MenuItem value={e}>{e}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button
                    disabled={(text == '')}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Aceptar
                </Button>
            </Box>
            <HashTextCards hashes={hashes} />
        </Box >
    )
}

export const getStaticProps = () => {
    const algorithms = getHashes()
    return {
        props: {
            algorithms
        }
    }
}