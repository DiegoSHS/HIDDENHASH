import { connex } from "@/models/connector"
import { getlockers } from "@/models/transactions"
import { Box } from "@mui/material"

export const getServerSideProps = async ({ query: { id } }) => {
    const collection = connex({})
    const lockers = await getlockers(collection, { email: id })
    return {
        props: {
            lockers: JSON.stringify(lockers)
        }
    }
}

export default function Locker({lockers}) {
    return (
        <Box>
        </Box>
    )
}

