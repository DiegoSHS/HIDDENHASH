import { StoredContext } from "@/context/context"
import { AccountCircle } from "@mui/icons-material"
import { AppBar, Avatar, Box, Button, Chip, Container, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

const AccountButton = ({ user }) => {
    const [anchor, setAnchor] = useState(null)
    const open = Boolean(anchor)

    const handleClick = (e) => {
        setAnchor(e.currentTarget)
    }
    const handleClose = () => {
        setAnchor(null)
    }
    return (!user.name ? (
        <IconButton disableRipple onClick={signIn}>
            <Chip label="Acceder" icon={<AccountCircle />} variant="outlined" />
        </IconButton>
    ) : (
        <>
            <IconButton
                disableRipple
                onClick={handleClick}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                <Avatar alt={user.name} src={user.image} />
            </IconButton>
            <Menu
                sx={{ p: 1 }}
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
            >
                <Link href={'/login'} passHref legacyBehavior>
                    <MenuItem sx={{ m: 0, p: 1 }}>
                        <ListItemIcon>
                            <Avatar alt={user.name} src={user.image} />
                        </ListItemIcon>
                        <Box sx={{ mx: 1 }}>
                            <Typography sx={{ mx: 1 }}>
                                {user.name}
                            </Typography>
                            <Typography sx={{ mx: 1 }}>
                                {user.email}
                            </Typography>
                        </Box>
                    </MenuItem>
                </Link>
            </Menu>
        </>

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
                    <Link href={`/hash/${user.email}`} legacyBehavior passHref>
                        <Button fullWidth sx={{ m: 1 }} disabled={!user.email} color="primary">
                            Mi bóveda
                        </Button>
                    </Link>
                    <AccountButton user={user} />
                </Toolbar>
            </Container>
        </AppBar>
    )
}