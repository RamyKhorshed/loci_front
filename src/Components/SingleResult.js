import React from 'react';
import { Card } from 'semantic-ui-react'


const SingleResult = props => (
  <Card
    header={props.title}
    name={props.title}
    meta={props.url}
    description={props.description}
    centered= {true}
    fluid= {true}
    onClick={()=>props.handleArticleSearch(props.title)}
  />
)

export default SingleResult;
