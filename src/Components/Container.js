import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ResultList from './ResultList';
import Wikitext from './Wikitext';
import { Divider } from 'semantic-ui-react'


class Container extends Component {
  constructor() {
    super();
    this.state = {
      topic: "",
      wikiDisplayed: false,
      articleHTML: {
        html:"",
        title:""
      },
      results: [
                '', [], [], []
            ]
    }
  }


  handleSearch = searchTerm => {

    let URL = "https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=" + searchTerm + "&limit=5"

    fetch(URL).then((resp)=> {
      return resp.json()
    })
    .then((data) => {
      this.setState({
        ...this.state,
        results: data,
        wikiDisplayed: false
      });
      }
    )
  }


  handleArticleSearch = searchTerm => {
    let URL = "http://en.wikipedia.org/w/api.php?action=parse&section=0&format=json&origin=*&prop=text&page=" + searchTerm + "&callback=?"
    let output = ""

    fetch(URL)
      .then((resp)=> resp.text())
      .then((data)=>{
        data = JSON.parse(data.substring(5).slice(0, -1));
        output = data.parse.title
        data = data.parse.text["*"];
        this.displayArticle(data, output);
      }
      )
  }

  handleTopicSubmit = e => {
    e.preventDefault();
    this.updateWiki();
  };

  handleSearchChange = e => {
    this.setState(
      {
				...this.state,
				topic: e.target.value
			}
    )
  }

  displayArticle = (html, title) => {
    this.setState({
      ...this.state,
      articleHTML: {
        html,
        title
      },
      wikiDisplayed: true
    });
  }



  updateWiki = () => {
    this.handleSearch(this.state.topic)
  }


  render() {
      return(
        <div>
        <h1 className="header">What do you want to learn about?</h1>
        <Searchbar
          topic={this.state.topic}
          handleSearchChange={this.handleSearchChange}
          handleTopicSubmit={this.handleTopicSubmit}/>
          <Divider section />
        {this.state.wikiDisplayed ?
          <Wikitext topic={this.state.topic} articleHTML={this.state.articleHTML}/>
            :
          <ResultList results={this.state.results} handleArticleSearch={this.handleArticleSearch}/>
        }
      </div>
    );
  }
}


export default Container;
