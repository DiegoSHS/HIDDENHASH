import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function About() {
    return (
        <Container>

            <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
                <Typography variant="h2" className='text-4xl sm:text-6xl' fontWeight={600} align="center" letterSpacing={3}>
                    Como encontrarnos
                </Typography>
                <Typography align="center" textAlign={'initial'} sx={{ mt: 5 }}>
                    Si quieres contactar a alguien de nuestro equipo, puedes hacerlo mediante alguno de nuestros correos o visitando los perfiles de github en donde hay más informacion de contacto
                </Typography>
                <Box display={'flex'} sx={{ my: 5 }}>
                    <Box sx={{ m: 1 }} display={'flex'} flexDirection={'column'} alignContent={'center'} alignItems={'center'}>
                        <Link href={'https://github.com/DiegoSHS'} passHref>
                            <Avatar sx={{ width: 70, height: 70, m: 1 }} alt="Diego López Ariza" src="https://avatars.githubusercontent.com/u/52292080?v=4">
                            </Avatar>
                        </Link>
                        Diego López Ariza
                        <Typography color={'orange'}>diegoawesome40@gmail.com</Typography>
                    </Box>
                    <Box sx={{ m: 1 }} display={'flex'} flexDirection={'column'} alignContent={'center'} alignItems={'center'}>
                        <Link href={'https://github.com/coby111'} passHref>
                            <Avatar sx={{ width: 70, height: 70, m: 1 }} alt="Asunción Soriano Morales" src="https://avatars.githubusercontent.com/u/100744345?v=4">
                            </Avatar>
                        </Link>
                        Asunción Soriano Morales
                        <Typography color={'orange'}>sorian11mor@gmail.com</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
