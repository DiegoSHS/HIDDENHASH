import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getLocker, getlockers } from "@/models/transactions"
import { sendSession } from "@/requests/requests"
import { Box, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export const getServerSideProps = async ({ query: { id } }) => {
  const collection = connex({ collec: 'users' })
  const hashcoll = connex({ collec: 'hashes' })
  const user = await getLocker(collection, { email: id })
  const hashes = await getlockers(hashcoll, { email: id })
  return {
    props: {
      items: {
        fuser: JSON.stringify(user),
        hashes: JSON.stringify(hashes)
      }
    }
  }
}

export default function Share({ items: { fuser, hashes } }) {
  const { memory: { user, storedHashes }, setStored } = StoredContext()
  const fetchUser = JSON.parse(fuser)
  const [userf, setUserf] = useState(fetchUser)
  const [selected, setSelected] = useState([])
  const [checked, setChecked] = useState(false)
  useEffect(() => { setStored({ storedHashes: JSON.parse(hashes) }) }, [])
  const handleSubmit = async () => {
    toast.promise(sendSession(user),
      {
        loading: 'Preparando',
        success: (data) => {
          if (data.error) {
            return `${data.error}`
          }
          setUserf({ ...user, _id: data.insertedId })
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
    if (selected.length === storedHashes.length || selected.length || checked) {
      setChecked(false)
      setSelected([])
      return
    }
    setChecked(true)
    setSelected(storedHashes.map(e => e._id))
  }
  if (userf) {
    return (
      <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
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
                      <TableCell><Checkbox size="small" onClick={handleSelectAll}></Checkbox></TableCell>
                      <TableCell>Texto original</TableCell>
                      <TableCell align="right">Hash</TableCell>
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
                        <TableCell align="right">{h.hash}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <NoContent>
                <Link href={`/hash/${user.email}`}>
                  <Button variant="contained">
                    Volver
                  </Button>
                </Link>
              </NoContent>
            )
          }
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
