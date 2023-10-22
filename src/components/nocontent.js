import { Box, Typography } from '@mui/material'

export const NoContent = ({ children }) => {
    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} alignContent={'center'}>
            <Typography alignSelf='center' letterSpacing={5} variant='h5' sx={{ m: 3 }} textAlign='center'>
                Aún no hay nada aquí
            </Typography>
            {children}
        </Box>
    )
}
