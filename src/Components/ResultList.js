import React, { Component } from 'react';
import SingleResult from './SingleResult';

class ResultList extends Component {
  render() {

    var results = this.props.results[1].map((result, index) => {
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

    return (
      <div className="result-list">{results}</div>
    );

  }
}

export default ResultList;
