import React from 'react';


const Searchbar = props => {

      return(
        <div className="ui icon input">
          <form  onSubmit={props.handleTopicSubmit}>
            <input
               type="text"
               onChange={props.handleSearchChange}
             />
            <button type="submit" className="ui button"> Search </button>
          </form>
        </div>
      )
}


export default Searchbar;
