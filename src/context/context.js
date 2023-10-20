import { getSession } from "next-auth/react"
import { createContext, useContext, useEffect, useState } from "react"

export const Data = createContext()

export const StoredContext = () => useContext(Data)

export const Context = (props) => {
    const { children } = props
    const [memory, setMemory] = useState({
        user: {},
        text: '',
        name: '',
        key: '',
        dialog: false,
        storedHashes: [],
        algorithm: 'sha256',
        selectedLocker: '',
        loading: false,
        hash: {}
    })
    const setStored = (prop) => { setMemory((prev) => ({ ...prev, ...prop })) }
    const sesionInit = async () => {
        const session = window.location.hostname === 'localhost' ? {
            user: {
                name: 'Jhon Doe',
                email: 'something@example.com',
                image: 'https://lh3.googleusercontent.com/a/AAcHTteDid88LgJbjhFjiv9paLPNOnM1pBOasbz0DKgHdZpMD3o=s96-c'
            }
        }
            : await getSession()
        setStored({ user: session.user })
    }
    useEffect(() => {
        sesionInit()
    }, [])
    const ctx = { memory, setStored }
    return (
        <Data.Provider value={ctx}>
            {children}
        </Data.Provider>
    )
}