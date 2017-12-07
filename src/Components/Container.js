import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ResultList from './ResultList';
import Wikitext from './Wikitext';
import { Divider } from 'semantic-ui-react'
import { api } from '../Services/api';


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

  componentWillMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      api.auth.getCurrentUser().then(user => {
        if (user.error) {
          this.props.history.push('/login');
        }
      });
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

  handleHighlight = (title) => {
    var text = window.getSelection().toString()

    var snippetInfo = this.props.currentSnippet.slice()
    var newSnippet = [title,text]
    snippetInfo.push(newSnippet)

    if (text.length > 3){
      this.props.currentSnippetUpdate(snippetInfo)
    }
  }

  postToDatabase =(newSnippet, index)=>{
    let user_id = this.props.user.id
    let URL = "http://localhost:3000/api/v1/snippets/"
    fetch(URL, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          title: newSnippet[0],
          content: newSnippet[1],
          user_id: user_id
        }
      )
    }).then(this.props.removeCurrentSnippet(index)).then(this.props.snippetUpdate(newSnippet))
  }

  handleArticleSearch = searchTerm => {
    let URL = "http://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&prop=text&page=" + searchTerm + "&callback=?"
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

        <div id="clickable">
          {this.state.wikiDisplayed ?
            <Wikitext
              topic={this.state.topic}
              articleHTML={this.state.articleHTML}

              handleHighlight={this.handleHighlight}
              postToDatabase={this.postToDatabase}

              currentSnippet={this.props.currentSnippet}
              removeCurrentSnippet={this.props.removeCurrentSnippet}/>
            :
            <ResultList
              results={this.state.results}
              handleArticleSearch={this.handleArticleSearch}/>
          }
        </div>
      </div>
    );
  }
}


export default Container;
