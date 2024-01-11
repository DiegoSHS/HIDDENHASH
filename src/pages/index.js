import { Apple, Duo, GitHub, Google, Twitter, WhatsApp, YouTube } from '@mui/icons-material'
import { Box, Button, Card, CardContent, IconButton, Typography } from '@mui/material'
import { blue, green, grey, red } from '@mui/material/colors'
import Link from "next/link"

export default function Home() {
  return (
    <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
      <Typography variant="h2" fontWeight={600} align="center" letterSpacing={3}>
        Una app para
      </Typography>
      <Box display={'flex'}>
        <Typography variant="h2" fontWeight={600} align="center" letterSpacing={3} color={'Orange'}>
          encriptar textos
        </Typography>
      </Box>
      <Typography variant="h2" fontWeight={600} align="center" letterSpacing={3}>y guardarlos</Typography>
      <Typography align="center" sx={{ mt: 5 }}>
        en esta web podrás encriptar los textos que quieras y también podrás guardarlos, esta web puede hacer hashes con la mayoria de algoritmos disponibles en openssl
      </Typography>
      <Box>
        <Link href={'/hash'} passHref legacyBehavior>
          <Button sx={{ m: 2 }} variant="contained" color="primary" style={{ background: 'white' }}>
            Comenzar
          </Button>
        </Link>
        <Link href={'https://github.com/DiegoSHS/HIDDENHASH'} passHref legacyBehavior>
          <Button sx={{ m: 2 }} variant="outlined" color='inherit'>
            GitHub
          </Button>
        </Link>
      </Box>
      <Box>
        <Typography variant='h4' fontWeight={600} align='center' letterSpacing={2} sx={{ my: 2 }}>
          Sponsors
        </Typography>
        <Box alignItems={'center'} display={'flex'} alignContent={'center'}>
          <Link legacyBehavior href={'https://google.com/'} passHref>
            <IconButton>
              <Google htmlColor={blue[300]}></Google>
            </IconButton>
          </Link>
          <Link href={'https://apple.com/'} passHref legacyBehavior>
            <IconButton>
              <Apple htmlColor={grey[600]}></Apple>
            </IconButton>
          </Link>
          <Link href={'https://duo.google.com/'} passHref legacyBehavior>
            <IconButton>
              <Duo htmlColor={blue[400]}></Duo>
            </IconButton>
          </Link>
          <Link href={'https://github.com/'} passHref legacyBehavior>
            <IconButton>
              <GitHub></GitHub>
            </IconButton>
          </Link>
          <Link href={'https://youtube.com/'} passHref legacyBehavior>
            <IconButton>
              <YouTube htmlColor={red[700]}></YouTube>
            </IconButton>
          </Link>
          <Link href={'https://whatsapp.com/'} passHref legacyBehavior>
            <IconButton>
              <WhatsApp htmlColor={green[400]}></WhatsApp>
            </IconButton>
          </Link>
          <Link href={'https://twitter.com/'} passHref legacyBehavior>
            <IconButton>
              <Twitter htmlColor={blue[200]}></Twitter>
            </IconButton>
          </Link>
        </Box>
      </Box>
      <Box>
        <Typography variant='h4' fontWeight={600} align='center' letterSpacing={2} sx={{ my: 2 }}>
          Opiniones
        </Typography>
        <Box display={'flex'} flexDirection={'row'} alignContent={'center'} alignItems={'center'}>
          <Card variant='outlined' sx={{ backgroundColor: '#00000050', m: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Diego
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Desarrollador
              </Typography>
              <Typography variant="body2">
                El proyecto es genial y sigue mejorando.
                <Typography color={'orange'}>
                  "Increible de inicio a fin"
                </Typography>
              </Typography>
            </CardContent>
          </Card>
          <Card variant='outlined' sx={{ backgroundColor: '#00000050', m: 1 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Asunción
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Desarrollador
              </Typography>
              <Typography variant="body2">
                Todo bien pero falta el algoritmo sm3.
                <Typography color={'orange'}>
                  "Todos los algoritmos"
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box >
  )
}
