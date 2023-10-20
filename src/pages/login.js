import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
const { StoredContext } = require("@/context/context")
const { Box, Button, Avatar, Typography } = require("@mui/material")

const Login = () => {
    const router = useRouter()
    const { memory: { user } } = StoredContext()
    useEffect(() => {
        if (!user.email) router.push('/')
    }, [])
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <img width={100} height={100} alt={user.name} src={user.image} style={{ borderRadius: 100 }} />
            <Typography component="h1" variant="h5">
                {user.name}
            </Typography>
            <Typography>
                {user.email}
            </Typography>
            <Box>
                <Button
                    onClick={() => {
                        signOut()
                        push('/')
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Cerrar sesión
                </Button>
            </Box>
        </Box>
    )
}

export default Login