import React from 'react';
import { Segment, Container, Header, Grid } from 'semantic-ui-react'
import SnippetList from './SnippetList';



  const Wikitext = props => {

        const HTMLtoRender = {__html:props.articleHTML.html}

        return(
          <Grid celled>
            <Grid.Row>
              <Grid.Column width={4}>
                <Segment basic>
                    <SnippetList removeCurrentSnippet={props.removeCurrentSnippet} currentSnippet={props.currentSnippet} postToDatabase={props.postToDatabase}/>
                </Segment>
              </Grid.Column>
              <Grid.Column width={11}>
                  <Segment basic>
                    <Container textAlign="left" text id="wikitext">
                      <Header as="h1">{props.articleHTML.title}</Header>
                      <div dangerouslySetInnerHTML={HTMLtoRender} onMouseUp={()=>props.handleHighlight(props.articleHTML.title)}/>
                    </Container>
                  </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )
  }


export default Wikitext;
