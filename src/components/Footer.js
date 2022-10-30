import React from "react";
import { Button, Segment, Input, Grid ,Icon} from "semantic-ui-react";

const Footer = () => (
  <>
    <Segment padded="very" tertiary style={{     
          bottom: "0",
          width: "100%",
        }}  >
      <Grid columns="equal">
        <Grid.Column>1</Grid.Column>
        <Grid.Column width={8}>
          <Input  fluid  placeholder="Search..." icon={<Icon name='search' inverted circular link />} ></Input>
        </Grid.Column>
        <Grid.Column>
          <div>
            <Button circular color="facebook" icon="facebook" />
            <Button circular color="twitter" icon="twitter" />
            <Button circular color="instagram" icon="instagram" />
            <Button circular color="youtube" icon="youtube" />
          </div>
        </Grid.Column>
      </Grid>
    </Segment>
  </>
);

export default Footer;
