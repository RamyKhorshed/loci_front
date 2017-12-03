import React from 'react';
import { Segment, Container, Header, Rail, Sticky } from 'semantic-ui-react'
import SnippetList from './SnippetList';



  const Wikitext = props => {

        const HTMLtoRender = {__html:props.articleHTML.html}


        return(
          <div>
            <Segment floated="left">
                <SnippetList snippetInfo={props.snippetInfo}/>

            </Segment>
              <Segment floated="left">
                <Container textAlign="left" text id="wikitext">
                  <Header as="h1">{props.articleHTML.title}</Header>
                  <div dangerouslySetInnerHTML={HTMLtoRender} onClick={()=>props.handleHighlight(props.articleHTML.title)}/>
                </Container>
              </Segment>

          </div>
        )
  }


export default Wikitext;
