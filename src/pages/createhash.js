import { useState } from "react"
import { Button, Card, Checkbox, Container, Grid, Input, List } from "semantic-ui-react"

export default function Hash() {
    const sendText = async() => {
        const res = await fetch('/api/hash',{
            body: {
                word,
                hashType
            },
            method: 'POST'
        })
        const newhash = await res.json()
        setHashess([newhash,...hashess])
    }
    const [hashess, setHashess] = useState([])
    const [word, setWord] = useState('')
    const [hashType, setHashType] = useState('sha256')
    return (
        <Container style={{marginTop:'300px'}}>
            <Grid centered columns={1}>
                <Checkbox 
                    radio
                    label='sha256'
                    name='sha256'
                    value='sha256'
                    checked={hashType==='sha256'}
                    onChange={(e,data)=> setHashType(data.value)}
                />
                <Checkbox 
                    radio
                    label='sha512'
                    name='sha512'
                    value='sha512'
                    checked={hashType==='sha512'}
                    onChange={(e,data)=> setHashType(data.value)}
                />
                <Checkbox 
                    radio
                    label='md5'
                    name='md5'
                    value='md5'
                    checked={hashType==='md5'}
                    onChange={(e,data)=> setHashType(data.value)}
                />
                <Input focus placeholder='texto a hashear' onChange={(e)=> {
                    console.log(word)
                    setWord(e.target.value)
                }}/>
                <Button content='Convertir' onClick={sendText}/>
                <Card.Group>
                    {
                        hashess.map((e,i)=>{
                            console.log(e)
                            return (
                                <Card key={i}>
                                    <Card.Header>
                                        Texto original: {e.original}
                                    </Card.Header>
                                    <Card.Description>
                                        <List>
                                            <List.Item>
                                                sha256: {e.sha256}
                                            </List.Item>
                                            <List.Item>
                                                sha512: {e.sha512}
                                            </List.Item>
                                            <List.Item>
                                                md5: {e.md5}
                                            </List.Item>

                                        </List>
                                    </Card.Description>
                                </Card>
                            )
                        })
                    }
                </Card.Group>
            </Grid>
        </Container>
    )
}