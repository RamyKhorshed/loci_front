import React from 'react';
import { Card, Button } from 'semantic-ui-react'


class SnippetList extends React.Component {

  render() {
    var snippets = this.props.currentSnippet.map((result, index) => {
        console.log(result)
        return (
          <Card key={index}
            centered= {true}
            condensed={true}
          >
            <Card.Content>
              <Card.Header>
                {result[0]}
              </Card.Header>
              <Card.Description>
                {result[1]}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic onClick={()=>this.props.postToDatabase([result[0],result[1]],index)} color='green'>Approve</Button>
                <Button basic onClick={()=>this.props.removeCurrentSnippet(index)}color='red'>Decline</Button>
              </div>
            </Card.Content>
          </Card>
        );
    });

    return(
      <div>
      <h1>Snippets:</h1>
      {snippets}
    </div>
    )
  }
}

export default SnippetList;
