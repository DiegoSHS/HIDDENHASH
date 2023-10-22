import { StoredContext } from "@/context/context"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"

export default function Personal() {
    const { memory: { user: { email } } } = StoredContext()
    return (
        <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
            <Typography variant="h2" fontWeight={600} align="center" letterSpacing={3}>
                Tu información en un solo lugar
            </Typography>
            <Typography align="center" sx={{ mt: 5 }}>
                em la bóveda puedes guardar información que solo podrá ser accedida mediante una contraseña
            </Typography>
            <Box>
                <Link href={`/hash/${email}/locker`} passHref legacyBehavior>
                    <Button sx={{ m: 2 }} variant="contained" color="primary" style={{ background: 'white' }}>
                        Mi bóveda
                    </Button>
                </Link>
                <Link href={`/hash/${email}`} passHref legacyBehavior>
                    <Button sx={{ m: 2 }} variant="outlined" color='inherit'>
                        Mis hashes
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}
