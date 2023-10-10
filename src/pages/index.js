import Head from 'next/head'
import { Button, Card, Form, Header, Menu, Modal, Table } from 'semantic-ui-react'
import { useState } from 'react'
import { getHashes } from "crypto"
import { HashCard, HashRow } from '@/components/hashTextCard'

export default function Home({ algorithms }) {
  const sendtext = async () => {
    if (text === '') {
      setError(true)
      return
    }
    const res = await fetch('/api/hash', {
      body: JSON.stringify({
        text,
        hashType
      }),
      method: 'POST'
    })
    const newhash = await res.json()
    setHashes([newhash, ...hashes])
  }
  const setHash = (e, data) => setHashType(data.value)
  const [hashes, setHashes] = useState([])
  const [text, setText] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [error, setError] = useState(false)
  const [viewmode, setViewMode] = useState(false)
  const [hashType, setHashType] = useState('sha256')
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Hash app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header content='Convertidor de texto a hash' size='large' />
        <Form>
          <Form.Group widths='equal'>
            <Form.TextArea error={error} required={true} label='Coloca un texto' focus placeholder='texto a hashear' onChange={(e) => {
              setError(false)
              setText(e.target.value)
            }} />
          </Form.Group>
          <Form.Group inline>
            <Form.Radio
              label='sha256'
              name='sha256'
              value='sha256'
              checked={hashType === 'sha256'}
              onChange={setHash}
            />
            <Form.Radio
              label='sha512'
              name='sha512'
              value='sha512'
              checked={hashType === 'sha512'}
              onChange={setHash}
            />
            <Form.Radio
              label='sha224'
              name='sha224'
              value='sha224'
              checked={hashType === 'sha224'}
              onChange={setHash}
            />
            <Form.Radio
              label='sha384'
              name='sha384'
              value='sha384'
              checked={hashType === 'sha384'}
              onChange={setHash}
            />
            <Form.Radio
              label='md5'
              name='md5'
              value='md5'
              checked={hashType === 'md5'}
              onChange={setHash}
            />
            <Form.Radio
              label='sm3'
              name='sm3'
              value='sm3'
              checked={hashType === 'sm3'}
              onChange={setHash}
            />
            <Modal
              size='mini'
              onClose={() => setOpenModal(false)}
              onOpen={() => setOpenModal(true)}
              open={openModal}
              trigger={
                <Button secondary labelPosition='right' label={`actual: ${hashType}`} content='Elegir otro' onClick={(e) => e.preventDefault()} />
              }
            >
              <Modal.Header>Seleccionar otro algoritmo</Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  <Header>Algoritmos disponibles</Header>
                  <Form>
                    {
                      algorithms.map((e, i) => {
                        return (
                          <Form.Radio
                            key={i}
                            label={e}
                            name={e}
                            value={e}
                            checked={hashType === e}
                            onChange={setHash}
                          />
                        )
                      })
                    }
                  </Form>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='black' content='Listo' onClick={() => setOpenModal(false)} />
              </Modal.Actions>
            </Modal>
          </Form.Group>
          <Menu secondary>
            <Menu.Item>
              <Button active content='Convertir' color='blue' onClick={sendtext} />
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                content='limpiar' color='red' active icon='trash alternate outline' onClick={(e) => {
                  e.preventDefault()
                  setHashes([])
                }}
              />
              <Menu.Item
                content='lista' color='blue' active={!viewmode} icon='list' onClick={(e) => {
                  e.preventDefault()
                  setViewMode(false)
                }}
              />
              <Menu.Item
                content='cuadricula' color='blue' active={viewmode} icon='th' onClick={(e) => {
                  e.preventDefault()
                  setViewMode(true)
                }}
              />
            </Menu.Menu>
          </Menu>
        </Form>
        {
          viewmode ? (
            <Card.Group>
              {
                hashes.map(HashCard)
              }
            </Card.Group>
          ) : (
            <Table fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width='2'>
                    Algoritmo
                  </Table.HeaderCell>
                  <Table.HeaderCell width='2'>
                    texto original
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Hash
                  </Table.HeaderCell>
                  <Table.HeaderCell width='3' />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  hashes.map(HashRow)
                }
              </Table.Body>
            </Table>
          )
        }
      </main>
    </>
  )
}

export const getStaticProps = () => {
  const algorithms = getHashes()
  return {
    props: {
      algorithms
    }
  }
}