import { sendFile } from "@/requests/requests"
import { ArrowRightAlt, CloudUpload, FolderZip, Key, Numbers, Pin, RuleFolder, Tag, TextFormat } from "@mui/icons-material"
import { Avatar, Box, Button, Chip, Divider, FormControlLabel, Slider, Switch, TextareaAutosize, Typography, styled } from "@mui/material"
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
    const [custom, setCustom] = useState(false)
    const [ctvalues, setCtvalues] = useState('')
    const [pass, setPass] = useState([])
    const handleUpload = async () => {
        const formData = new FormData()
        files.forEach(f => formData.append('files', f))
        toast.promise(sendFile(formData, {
            ...params, ct: ctvalues.split("")
                .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
                .join("")
        }), {
            success: (data) => {
                if (data.error) {
                    return `Contraseñas incorrectas ${data.error.message}`
                }
                if (data.password === null) {
                    return 'Clave no encontrada'
                }
                setPass((prev) => [...prev, data])
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
        }
    }
    const handleParams = (e) => {
        setParams({ ...params, [e.target.name]: e.target.checked })
    }
    const handleSlider = (e, newValue) => {
        setParams({ ...params, len: newValue })
    }
    const handleCustom = (e) => {
        setCtvalues(e.target.value)
        console.log(ctvalues)
    }
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: 'flex',
            }}>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Numbers color="secondary" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <Pin color="info" />
                </Avatar>
                <Avatar sx={{ bgcolor: 'inherit' }}>
                    <RuleFolder color="secondary" />
                </Avatar>
            </Box>
            <Typography component="h1" variant="h5">
                Encuentra la clave de un zip
            </Typography>
            <Typography variant="body2" textAlign='center' sx={{ mt: 1 }}>
                Calcula la contraseña de un archivo zip
            </Typography>
            <Button component="label" sx={{m:1}} startIcon={<CloudUpload />}>
                Subir archivo zip
                <VisuallyHiddenInput type="file" onChange={handleChange} />
            </Button>
            <FileNames fileData={files}></FileNames>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                <FormControlLabel sx={{ mx: 0, my: 2 }} label='Tamaño de la contraseña' labelPlacement="top" control={<Slider
                    value={params.len}
                    onChange={handleSlider}
                    valueLabelDisplay='auto'
                    step={1}
                    marks
                    min={1}
                    max={8}
                />} />
                <Typography>Opciones para generación de contraseñas</Typography>
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="up" disabled={custom} checked={params.up} onChange={handleParams} />} label='Minúsculas' />
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="lw" disabled={custom} checked={params.lw} onChange={handleParams} />} label='Mayúsculas' />
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="dig" disabled={custom} checked={params.dig} onChange={handleParams} />} label='Digitos' />
                <FormControlLabel labelPlacement="start" control={<Switch color="info" name="sp" disabled={custom} checked={params.sp} onChange={handleParams} />} label='Carácteres especiales' />
                <Divider>o</Divider>
                <FormControlLabel labelPlacement="start" sx={{ mt: 1 }} control={<Switch color="warning" name="sp" checked={custom} onChange={() => { setCustom(!custom) }} />} label='Personalizado' />
                <Typography>Escribe los carácteres para generar las contraseñas</Typography>
                <TextareaAutosize maxLength={40} placeholder="Ejemplo: AaBb1234" disabled={!custom} onChange={handleCustom} style={{ margin: 20, backgroundColor: 'transparent', borderRadius: 5 }}></TextareaAutosize>

            </Box>
            <Button sx={{ m: 1 }} variant="contained" disabled={files.length === 0 || ((!params.dig && !params.lw && !params.up && !params.sp))} onClick={handleUpload}>Desencriptar</Button>
            <Box>
                {
                    pass.map((e, i) => {
                        return <Chip sx={{ m: 1 }} color="warning" label={`Clave: ${e.password}`} key={i} icon={<Key />} />
                    })
                }
            </Box>
        </Box >
    )
}