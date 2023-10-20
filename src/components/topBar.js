import { StoredContext } from "@/context/context"
import { AccountCircle, Tag } from "@mui/icons-material"
import { AppBar, Avatar, Button, Chip, Container, IconButton, Toolbar } from "@mui/material"
import { signIn } from "next-auth/react"
import Link from "next/link"

const AccountButton = ({ user }) => {
    return (!user.name ? (
        <IconButton disableRipple onClick={signIn}>
            <Chip label="Acceder" icon={<AccountCircle />} variant="outlined" />
        </IconButton>
    ) : (
        <Link href={'/login'} legacyBehavior passHref>
            <IconButton
                disableRipple
            >
                <Avatar alt={user.name} src={user.image} />
            </IconButton>
        </Link>
    ))
}

export const TopBarScroll = () => {
    const { memory: { user } } = StoredContext()
    return (
        <AppBar sx={{ backgroundColor: 'transparent', background: '000000', backdropFilter: 'blur(10px)', boxShadow: 0 }}>
            <Container maxWidth='sm'>
                <Toolbar >
                    <Link href={'/'} legacyBehavior passHref>
                        <Button fullWidth sx={{ m: 1 }} color="primary">
                            Inicio
                        </Button>
                    </Link>
                    <Link href={`/hash`} legacyBehavior passHref>
                        <Button fullWidth sx={{ m: 1 }} color="primary">
                            Hash
                        </Button>
                    </Link>
                    <Link href={`/hash/personal`} legacyBehavior passHref>
                        <Button fullWidth sx={{ m: 1 }} disabled={!user.email} color="primary">
                            Personal
                        </Button>
                    </Link>
                    <AccountButton user={user} />
                </Toolbar>
            </Container>
        </AppBar>
    )
}