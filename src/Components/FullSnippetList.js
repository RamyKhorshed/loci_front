import React from 'react';
import { Card, Button, Grid, Header, Segment } from 'semantic-ui-react'


class FullSnippetList extends React.Component {
  constructor() {
    super();
    this.state = {
      imageSearched: "awesome"
  }
}

  changeImage = (imageSearched) => {
    localStorage.setItem('image', imageSearched);
    window.location.reload();
  }

  render() {
    console.log(this.state)
    let imageTitle = localStorage.getItem('image')
    let snippets = this.props.snippetInfo.map((result, index) => {
        return (

                <Card
                  key={index}
                  condensed={true}
                  >
                  <Card.Content>
                    <Card.Header>
                      {result[0]}
                    </Card.Header>
                    <Card.Description condensed={true}>
                      {result[1]}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button onClick={()=>this.props.removeSnippet(index)} basic color='red'>Remove</Button>
                      <Button onClick={()=>this.changeImage(result[0])} basic color='green'>Image Association</Button>
                    </div>
                  </Card.Content>
                </Card>



        );
    });

    return(

      <div>
        <h1>Snippets:</h1>
        <div class="imageContainer" >
          <div class="pixabay_widget" data-search={imageTitle} min_width="500" min_height="500" data-max-rows="1"></div>
        </div>
      <div class="sideContainer" >
      <Grid>
        <Grid.Row>
          <Card.Group>
              {snippets}
        </Card.Group>
        </Grid.Row>
      </Grid>
      </div>

    </div>
    )
  }
}

export default FullSnippetList;
