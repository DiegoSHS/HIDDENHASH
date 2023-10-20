import { StoredContext } from "@/context/context"
import { sendEncrypt } from "@/requests/requests"
import { Key, Lock, Password } from "@mui/icons-material"
import { Avatar, Box, Button, LinearProgress, TextField, Typography } from "@mui/material"
import Link from "next/link"
import toast from "react-hot-toast"

export default function Locker() {
    const { memory: { text, key, name, user: { email }, loading }, setStored } = StoredContext()
    const handleChange = (e) => {
        setStored({ [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setStored({ loading: true })
        toast.promise(sendEncrypt({ text, secret_key: key, email, name }), {
            error: 'Error al guardar',
            success: (data) => `${data.message}`,
            loading: 'Encriptando'
        }, {
            success: { icon: false }
        })
        setStored({ loading: false })
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
                    <Key color="warning" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Password color="secondary" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Lock color="warning" />
                </Avatar>
            </Box>
            <Typography component="h1" variant="h5">
                Encripta texto
            </Typography>
            <Typography variant="body2" textAlign='center' sx={{ mt: 1 }}>
                Encripta un texto con una clave y un algoritmo robusto, solo se podrá acceder con la clave
            </Typography>
            <Typography variant="body2" color='warning.main'>
                ¡No la olvides!
            </Typography>
            <Box component="form" onChange={handleChange} noValidate sx={{ mt: 1 }}>
                <TextField
                    defaultValue={name}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Nombre identificador"
                    name="name"
                    autoFocus
                />
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    error={key !== '' && key.length <= 7}
                    id="key"
                    label="Clave secreta"
                    name="key"
                />
                {key !== '' && key.length <= 7 && (
                    <Typography variant="caption" color={'error'}>
                        La contraseña es muy corta
                    </Typography>
                )}
                <Button
                    disabled={(text == '' || key == '' || key.length <= 7 || name == '' || loading)}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="warning"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit}
                >
                    Aceptar
                </Button>
                <Link href={`/hash/${email}/locker`}>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Volver
                    </Button>
                </Link>
                {loading && <LinearProgress />}
            </Box>
        </Box >
    )
}

