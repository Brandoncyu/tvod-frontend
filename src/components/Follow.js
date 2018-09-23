import React, { Component } from 'react'
import Header from './Header'
import Title from './follow/01Title'

class Follow extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div>
        <Header />
        <Title />
      </div>
    )
  }
}

export default Follow
