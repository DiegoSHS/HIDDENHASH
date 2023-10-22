export const ShareAccordion = ({ origin, sharedItems, addressee, _id }) => {
    return (
        <Accordion sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '85vw' }}>
            <AccordionSummary expandIcon={<ExpandMore />} id="sharedFrom">
                <Typography>Compartido por: {origin}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Container maxWidth='sm'>
                    <HashSharedCards key={_id} hashes={sharedItems} shareInfo={{
                        addressee: addressee,
                        origin: origin
                    }} />
                </Container>
            </AccordionDetails>
        </Accordion>
    )
}

export const ShareWith = ({ user: { name, email }, selected, addressee, handler }) => {
    return (
        <Card>
            <CardHeader
                title={name}
                subheader={email}
                action={
                    <IconButton onClick={() => {
                        handler({ origin: email, sharedItems: selected, addressee: addressee })
                    }}>
                        <Send />
                    </IconButton>
                }
            />
        </Card>
    )
}