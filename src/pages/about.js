import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import Link from "next/link";

export default function About() {
    return (
        <Container>
            <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
                <div className="flex gap-2 sm:flex sm:flex-col">
                    <Typography variant="h2" className="text-4xl sm:text-6xl" fontWeight={600} align="center" letterSpacing={3}>
                        Acerca de
                    </Typography>
                    <Typography variant="h2" className="text-4xl sm:text-6xl" fontWeight={600} align="center" letterSpacing={3} color={'Orange'}>
                        nosotros
                    </Typography>
                </div>
                <Typography align="center" textAlign={'initial'} sx={{ mt: 5 }}>
                    Esta es un web creada como una demostración del funcionamiento de los algoritmos hash disponibles en el paquete openssl, el proyecto es open source y se puede encontrar en alojado en github, para el despliegue se utilizó el servicio de render deploy y para base de datos mongodb atlas
                </Typography>
                <Box>
                    <Link href={'https://github.com/DiegoSHS/HIDDENHASH'} passHref legacyBehavior>
                        <Button sx={{ m: 2 }} variant="outlined" color='inherit'>
                            GitHub
                        </Button>
                    </Link>
                    <Link href={'https://render.com/'} passHref legacyBehavior>
                        <Button sx={{ m: 2 }} variant="outlined" color='inherit'>
                            Render
                        </Button>
                    </Link>
                </Box>
                <Typography className="text-4xl sm:text-6xl" fontWeight={600} align="center" letterSpacing={3}>
                    Colaboradores
                </Typography>
                <Typography align="center" textAlign={'initial'}>
                    Personas que han colaborado en este proyecto
                </Typography>
                <Box display={'flex'} sx={{ my: 5 }}>
                    <Box sx={{ m: 1 }} display={'flex'} flexDirection={'column'} alignContent={'center'} alignItems={'center'}>
                        <Link href={'https://github.com/DiegoSHS'} passHref>
                            <Avatar sx={{ width: 70, height: 70, m: 1 }} alt="Diego López Ariza" src="https://avatars.githubusercontent.com/u/52292080?v=4">
                            </Avatar>
                        </Link>
                        Diego López Ariza
                    </Box>
                    <Box sx={{ m: 1 }} display={'flex'} flexDirection={'column'} alignContent={'center'} alignItems={'center'}>
                        <Link href={'https://github.com/coby111'} passHref>
                            <Avatar sx={{ width: 70, height: 70, m: 1 }} alt="Asunción Soriano Morales" src="https://avatars.githubusercontent.com/u/100744345?v=4">
                            </Avatar>
                        </Link>
                        Asunción Soriano Morales
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}
