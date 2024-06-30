import { StoredContext } from "@/context/context"
import { AccountCircle, MoreVert } from "@mui/icons-material"
import { AppBar, Avatar, Button, Chip, Container, IconButton, Menu, MenuItem, Toolbar } from "@mui/material"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

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
    const [anchorEl, setAnchorEl] = useState(null)
    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
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
                    <div className="sm:flex hidden">
                        <Link href={`/zip`} legacyBehavior passHref>
                            <Button fullWidth sx={{ m: 1 }} color="primary">
                                zip
                            </Button>
                        </Link>
                        <Link href={`/hash/personal`} legacyBehavior passHref>
                            <Button fullWidth sx={{ m: 1 }} disabled={!user.email} color="primary">
                                Personal
                            </Button>
                        </Link>
                    </div>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <MoreVert></MoreVert>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <div className="sm:hidden flex flex-col">
                                <Link href={`/hash/personal`} legacyBehavior passHref>
                                    <MenuItem>
                                        Personal
                                    </MenuItem>
                                </Link>
                                <Link href={`/zip`} legacyBehavior passHref>
                                    <MenuItem>
                                        Desencriptar zip
                                    </MenuItem>
                                </Link>
                            </div>
                            <Link href={`/contact`} legacyBehavior passHref>
                                <MenuItem>
                                    Contacto
                                </MenuItem>
                            </Link>
                            <Link href={`/about`} legacyBehavior passHref>
                                <MenuItem>
                                    Nosotros
                                </MenuItem>
                            </Link>
                        </Menu>
                    </div>
                    <AccountButton user={user} />
                </Toolbar>
            </Container>
        </AppBar>
    )
}