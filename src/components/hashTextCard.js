import { Button, Card, Popup, Table } from "semantic-ui-react"

export const HashCard = ({ original, hashType, hash }, i) => {
    const copy = async () => {
        await navigator.clipboard.writeText(hash)
    }
    return (
        <Card key={i} centered>
            <Card.Header>
                Texto original: {original}
            </Card.Header>
            <Card.Meta>
                Algoritmo: {hashType}
            </Card.Meta>
            <Popup
                content='Click para copiar'
                trigger={<Button as='div' fluid style={{ overflow: 'hidden' }} content={hash} compact onClick={copy} />}
            />
        </Card>
    )
}

export const HashRow = ({ original, hashType, hash }) => {
    const copy = async () => {
        await navigator.clipboard.writeText(hash)
    }
    return (
        <Table.Row>
            <Table.Cell>
                {hashType}
            </Table.Cell>
            <Table.Cell>
                {original}
            </Table.Cell>
            <Table.Cell selectable singleLine>
                {hash}
            </Table.Cell>
            <Table.Cell collapsing>
                <Button icon='copy' onClick={copy} content='Copiar' />
            </Table.Cell>
        </Table.Row>
    )
}