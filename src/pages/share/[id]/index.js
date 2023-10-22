import { NoContent } from "@/components/nocontent"
import { ShareWith } from "@/components/shareAccordion"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getLocker, getlockers } from "@/models/transactions"
import { getSessions, handleShare, sendSession } from "@/requests/requests"
import { ArrowBack, Send } from "@mui/icons-material"
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Fab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const getServerSideProps = async ({ query: { id } }) => {
  const collection = connex({ collec: 'users' })
  const hashcoll = connex({ collec: 'hashes' })
  const user = await getLocker(collection, { email: id })
  const hashes = await getlockers(hashcoll, { email: id })
  const users = await getlockers(collection, {})
  return {
    props: {
      items: {
        fuser: JSON.stringify(user),
        hashes: JSON.stringify(hashes),
        users: JSON.stringify(users)
      }
    }
  }
}

export default function ShareItems({ items: { fuser, hashes } }) {
  const fetchUser = JSON.parse(fuser)
  const { memory: { user, storedHashes, storedUsers, dialog }, setStored } = StoredContext()
  const [userf, setUserf] = useState(fetchUser)
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  const getter = async () => {
    const res = await getSessions()
    if (res.error) {
      return
    }
    const users = res.filter(e => e.email !== user.email)
    setStored({ storedUsers: users })
  }

  useEffect(() => {
    setStored({ storedHashes: JSON.parse(hashes) })
    getter()
  }, [])
  const handleSubmit = async () => {
    toast.promise(sendSession(user),
      {
        loading: 'Preparando',
        success: (data) => {
          if (data.error) {
            return `${data.error}`
          }
          setUserf({ email: user.email, name: user.name, _id: data.insertedId })
          return 'Registrado con éxito'
        },
        error: 'Error al registrar'
      })
  }
  const handleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(e => e !== id))
      return
    }
    setSelected([...selected, id])
  }
  const handleSelectAll = () => {
    if (selected.length === storedHashes.length || selected.length !== 0 || checked) {
      setChecked(false)
      setSelected([])
      return
    }
    setChecked(true)
    setSelected(storedHashes.map(e => e._id))
  }
  const handleStartShare = () => {
    setStored({ dialog: true })
  }
  const handleClose = () => {
    setStored({ dialog: false })
  }
  if (userf) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        <Dialog open={dialog} onClose={handleClose} maxWidth='sm' >
          <DialogTitle>Enviar a</DialogTitle>
          <DialogContent>
            {storedUsers.length !== 0 ?
              (storedUsers.map((e, i) => {
                return (
                  <ShareWith user={e} selected={selected} handler={handleShare} origin={user.email} key={i} />
                )
              })) :
              (<Typography>No hay nadie con quien copartir aún</Typography>)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Terminar</Button>
          </DialogActions>
        </Dialog>
        <Box >
          <Typography align="center" sx={{ mt: 5 }}>
            Compartir hashes
          </Typography>
          <Box>
            {
              storedHashes.length !== 0 ? (
                <TableContainer>
                  <Table size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell><Checkbox size="small" onClick={handleSelectAll} checked={selected.length === storedHashes.length || checked && selected.length === 0}></Checkbox></TableCell>
                        <TableCell>Texto original</TableCell>
                        <TableCell align="right">Algoritmo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {storedHashes.map((h) => (
                        <TableRow
                          hover
                          selected={selected.includes(h._id)}
                          onClick={() => { handleSelected(h._id) }}
                          key={h._id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell align="right"><Checkbox size="small" checked={selected.includes(h._id)}></Checkbox></TableCell>
                          <TableCell component="th" scope="row">{h.original}</TableCell>
                          <TableCell align="right">{h.algorithm}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <NoContent>
                </NoContent>
              )
            }
          </Box>
        </Box>
        <Box sx={{ position: 'fixed', bottom: 100 }}>
          <Link href={`/hash/${user.email}`} passHref legacyBehavior>
            <Fab size="medium" sx={{ m: 1 }}>
              <ArrowBack />
            </Fab>
          </Link>
          <Fab onClick={handleStartShare} size="medium" disabled={selected.length === 0} sx={{ m: 1 }}>
            <Send />
          </Fab>
        </Box>
      </Box>
    )
  }
  return (
    <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
      <Typography variant="h2" fontWeight={600} align="center">
        Comparte tus hashes
      </Typography>
      <Typography align="center" sx={{ mt: 5 }}>
        Empieza a compartir tus hashes con otros usuarios
      </Typography>
      <Box>
        <Button onClick={handleSubmit} sx={{ m: 2 }} variant="contained" color="primary" style={{ background: 'white' }}>
          Comenzar a compartir
        </Button>
      </Box>
    </Box>
  )
}
