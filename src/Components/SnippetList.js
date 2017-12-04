import React from 'react';
import { Card } from 'semantic-ui-react'


class SnippetList extends React.Component {

  render() {
    var snippets = this.props.snippetInfo.map((result, index) => {
        console.log(result)
        return (
          <Card
            header={result[0]}
            description={result[1]}
            centered= {true}
          />
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
