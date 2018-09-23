import React, { Component } from 'react'
import Header from './Header'
import Title from './showselect/01Title'
import SearchBar from './showselect/02SearchBar'

class ShowSelect extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <Header />
        <Title />
        <SearchBar />
      </div>
    )
  }
}

export default ShowSelect
