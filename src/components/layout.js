import { TopBarScroll } from '@/components/topBar'
import { Context } from '@/context/context'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Toaster } from 'react-hot-toast'

const darkTheme = createTheme({
    palette: { mode: 'dark', background: { default: '5c5c5c' }, primary: { main: '#FFFFFF' } }
})

export default function Layout({ children }) {

    return (
        <Context>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline enableColorScheme />
                <Toaster position='bottom-right'/>
                <Container sx={{ my: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }} fixed component='main' maxWidth='sm'>
                    <title>UXRATE</title>
                    <TopBarScroll />
                    {children}
                </Container>
            </ThemeProvider>
        </Context>
    )
}