import React, {Component} from 'react'
import {
  ListGroup
} from 'reactstrap'
import FriendsListItem from './02FriendsSaying/FriendsListItem'
import {shuffle} from '../_shuffle'
import { connect } from 'react-redux'
import { getFollowers } from '../../actions/friendsSaying'
import { bindActionCreators } from 'redux'


class FriendsSaying extends Component {
  async componentDidMount(){
    await this.getAllFollowers()
  }

  getAllFollowers = async () =>{
    const userid = Number(localStorage.getItem('id'))
    await this.props.getFollowers(userid)
  }

  render(){
    let friends = []
    if(this.props.friends){
      friends = shuffle(this.props.friends)
    }

    return (
      <ListGroup className="stretch">
        {friends.map((element,index) =>
          <FriendsListItem
            key={index}
            userInfo={element}
            episodeInfo={element['episode_description']}
          />)}
      </ListGroup>
    )
  }
}

function mapStateToProps(state) {
  return {
    friends: state.friendsSaying.users
  }
}

function mapDispatchToProps(dispatch){
  return{
    getFollowers: bindActionCreators(getFollowers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsSaying)
