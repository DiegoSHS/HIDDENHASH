import { Apple, Duo, GitHub, Google } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import Link from "next/link"

export default function Home() {
  return (
    <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
      <Typography variant="h2" fontWeight={600} align="center" letterSpacing={3}>
        Una app para encriptar textos y guardarlos
      </Typography>
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
        <Typography variant='h4' align='center' letterSpacing={2} sx={{ mt: 5 }}>
          Quienes confian en nosotros (no en verdad)
        </Typography>
        <Box alignItems={'center'} display={'flex'} alignContent={'center'}>
          <Link legacyBehavior href={'https://google.com/'} passHref>
            <IconButton>
              <Google></Google>
            </IconButton>
          </Link>
          <Link href={'https://apple.com/'} passHref legacyBehavior>
            <IconButton>
              <Apple></Apple>
            </IconButton>
          </Link>
          <Link href={'https://duo.google.com/'} passHref legacyBehavior>
            <IconButton>
              <Duo></Duo>
            </IconButton>
          </Link>
          <Link href={'https://github.com/'} passHref legacyBehavior>
            <IconButton>
              <GitHub></GitHub>
            </IconButton>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
