import { Accordion, AccordionDetails, AccordionSummary, Card, CardHeader, Container, Fab, Typography } from "@mui/material"
import { HashSharedCards } from "./hashTextCard"
import { ExpandMore, Send } from "@mui/icons-material"
import { LockerCard, LockerCards } from "./lockerCard"

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

export const LockerAccordion = ({ origin, sharedItems }) => {
    return (
        <Accordion sx={{ background: 'transparent', minWidth: '30vw', maxWidth: '85vw' }}>
            <AccordionSummary expandIcon={<ExpandMore />} id="sharedFrom">
                <Typography>Compartido por: {origin}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Container maxWidth='sm'>
                    <LockerCards lockers={sharedItems}></LockerCards>
                </Container>
            </AccordionDetails>
        </Accordion>
    )
}

export const ShareWith = ({ user: { name, email }, selected, origin, handler }) => {
    return (
        <Fab variant="extended" size="small" sx={{ maxWidth: '100%', minWidth: '100%', my: 1 }} onClick={() => {
            handler({ origin: origin, sharedItems: selected, addressee: email })
        }}>
            {name}<Send sx={{ ml: 1 }} />
        </Fab>
    )
}