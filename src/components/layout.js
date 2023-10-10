import { Container, Grid } from "semantic-ui-react";

export default function Layout({children}){
    return (
        <Grid columns={1}>
            <Container fluid style={{ marginTop: "5vh" }} >
                <Grid container stretched inverted centered columns={1}>
                    <Grid.Column textAlign="center" verticalAlign='middle'>
                        {children}
                    </Grid.Column>
                </Grid>
            </Container>
        </Grid>
    )
}