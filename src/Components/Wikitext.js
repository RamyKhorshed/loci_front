import React from 'react';
import { Container, Header } from 'semantic-ui-react'



  const Wikitext = props => {

        const HTMLtoRender = {__html:props.articleHTML.html}

        return(
          <Container textAlign="center" text>
            <Header as="h1">{props.articleHTML.title}</Header>
            <div dangerouslySetInnerHTML={HTMLtoRender} />
          </Container>
        )
  }


export default Wikitext;
