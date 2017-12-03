import React from 'react';

const SnippetList = props => {
  return(
    var snippets = this.props.results[1].map((result, index) => {
        return (
            <SingleResult
              key={index}
              title={this.props.results[1][index]}
              description={this.props.results[2][index]}
              url={this.props.results[3][index]}
              handleArticleSearch={this.props.handleArticleSearch}
            />
        );
    });

    <h1>Snippets:</h1>
    {snippets}
  )
}

export default SnippetList;
