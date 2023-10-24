import { sendFile } from "@/requests/requests"
import { CloudUpload, FolderZip, Key } from "@mui/icons-material"
import { Box, Button, Chip, Divider, FormControlLabel, Slider, Switch, Typography, styled } from "@mui/material"
import { useState } from "react"
import toast from "react-hot-toast"

export const FileNames = ({ fileData }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {
                fileData.map((f, i) => {
                    return <Chip sx={{ m: 1 }} color="default" label={f.name} key={i} icon={<FolderZip />} />
                })
            }
        </Box>
    )
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const DropZone = () => {
    const [files, setFiles] = useState([])
    const [params, setParams] = useState({
        len: 1,
        dig: true,
        up: false,
        lw: false,
        sp: false
    })
    const [pass, setPass] = useState([])
    const handleUpload = async () => {
        const formData = new FormData()
        files.forEach(f => formData.append('files', f))
        console.log(formData)
        toast.promise(sendFile(formData, params), {
            success: (data) => {
                if (data.error) {
                    return `Contraseñas incorrectas ${data.error.message}`
                }
                if (data.every(e => e===null)) {
                    return 'Clave no encontrada'
                }
                setPass((prev) => [...prev, ...data])
                console.log(pass)
                return 'Procesado correctamente'
            },
            error: (data) => `${data.error.message}`,
            loading: 'Procesando'
        }, {
            success: { icon: false }
        })
    }
    const handleChange = e => {
        e.preventDefault()
        e.stopPropagation()
        const filess = e.target.files
        if (filess && filess.length > 0) {
            setFiles([...filess])
            console.log('filess: ', files)
        }
    }
    const handleParams = (e) => {
        setParams({ ...params, [e.target.name]: e.target.checked })
    }
    const handleSlider = (e, newValue) => {
        setParams({ ...params, len: newValue })
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                <FormControlLabel sx={{ mx: 0, my: 2 }} label='Tamaño de la contraseña' labelPlacement="bottom" control={<Slider
                    value={params.len}
                    onChange={handleSlider}
                    valueLabelDisplay='auto'
                    step={1}
                    size='small'
                    min={0}
                    max={16}
                />} />
                <Divider />
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="up" checked={params.up} onChange={handleParams} />} label='Minúsculas' />
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="lw" checked={params.lw} onChange={handleParams} />} label='Mayúsculas' />
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="dig" checked={params.dig} onChange={handleParams} />} label='Digitos' />
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="sp" checked={params.sp} onChange={handleParams} />} label='Carácteres especiales' />
            </Box>
            <Button component="label" variant="contained" startIcon={<CloudUpload />}>
                Subir archivos
                <VisuallyHiddenInput type="file" onChange={handleChange} />
            </Button>
            <FileNames fileData={files}></FileNames>
            <Button disabled={files.length === 0} onClick={handleUpload}>Desencriptar</Button>
            <Box>
                {
                    pass.map((e, i) => {
                        return <Chip sx={{ m: 1 }} color="warning" label={`Clave: ${e.password}`} key={i} icon={<Key />} />
                    })
                }
            </Box>
        </Box>
    )
}