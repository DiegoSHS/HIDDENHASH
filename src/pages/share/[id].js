import { NoContent } from "@/components/nocontent"
import { StoredContext } from "@/context/context"
import { connex } from "@/models/connector"
import { getLocker } from "@/models/transactions"
import { sendSession } from "@/requests/requests"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"

export const getServerSideProps = async ({ query: { id } }) => {
  const collection = connex({ collec: 'users' })
  const user = await getLocker(collection, { email: id })
  return {
    props: {
      fuser: JSON.stringify(user)
    }
  }
}

export default function Share({ fuser }) {
  const fetchUser = JSON.parse(fuser)
  const [userf, setUserf] = useState(fetchUser)
  const { memory: { user, storedHashes, storedLockers } } = StoredContext()
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
  if (userf) {
    return (
      <Box sx={{ my: 10 }} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
        <Typography align="center" sx={{ mt: 5 }}>
          Compartir hashes
        </Typography>
        <Box>
          {
            storedHashes.length !== 0 ? (
              storedHashes.map(e => <Typography>{e.original}</Typography>)
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
