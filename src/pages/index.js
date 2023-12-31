import { Box, Button, Typography } from '@mui/material'
import Link from "next/link"

export default function Home() {
  return (
    <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
      <Typography variant="h2" fontWeight={600} align="center" letterSpacing={3}>
        Una app para encriptar textos y guardarlos
      </Typography>
      <Typography align="center" sx={{ mt: 5 }}>
        en esta web podrás encriptar los textos que quieras y también podrás guardarlos
      </Typography>
      <Box>
        <Link href={'/hash'} passHref legacyBehavior>
          <Button sx={{ m: 2 }} variant="contained" color="primary" style={{ background: 'white' }}>
            Comenzar
          </Button>
        </Link>
        <Link href={'https://github.com/DiegoSHS/HIDDENHASH'} passHref legacyBehavior>
          <Button sx={{ m: 2 }} variant="outlined" color='inherit'>
            github
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
