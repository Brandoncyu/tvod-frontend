import React, { Component } from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { addFollow } from '../models/followUsers'
import { getUserData } from '../actions/followUsersPage'
import CardRows from './followUsersPage/00CardRows'
import CardRowsFavorites from './followUsersPage/01CardRowsFavorites'
import ActivityList from './followUsersPage/03ActivityList'
import {
  Container, Row, Col, Button, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import classnames from 'classnames';



class FollowUsersPage extends Component {
  constructor(props){
    super(props)

    this.toggle = this.toggle.bind(this);

    this.state = {
      following: false,
      activeTab: '1'
    }
  }

  async componentDidMount() {
    await this.findUser()
    if (this.props.userPage === false){
      this.props.history.push('/following')
    }
    window.scrollTo(0, 0)
  }

  addToFollow = async () =>{
    const userId = Number(localStorage.getItem('id'))
    const followId = this.props.userPage.id
    await addFollow(userId, followId)
    this.setState({
      following: true
    })
  }

  findUser = async () =>{
    const userName = this.props.match.params.name
    const id = localStorage.getItem('id')
    await this.props.getUserData(userName, id)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render(){
    const userInfo = this.props.userPage
    let renderButton = false
    if (userInfo){
      renderButton = userInfo.following || this.state.following
    }
    return (
      <div>
        <Header />
        <Container>
          <Row>
            <Col md="3" className="mr-4">
              <img height="300" className="rounded-circle" src={this.props.userPage.image} alt="user card" />
            </Col>
            <Col className="ml-4">
              <h1>{this.props.userPage.username}</h1>
              {renderButton ?
                <h4>✓ following</h4> :
                <div>
                  <Button onClick={this.addToFollow} size="md" color="info" >
                    + Follow
                  </Button>
                  <br />
                </div>}
              <br />
              <p>
                Name: {this.props.userPage.firstname} {this.props.userPage.lastname}
              </p>
              <p>
                {this.props.userPage.aboutme}
              </p>
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Favorite Shows
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Other Shows
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                Recent Activity
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <CardRows />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
              <Col sm="12">
                <CardRowsFavorites />
              </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
              <Col sm="12">
                <ActivityList />
              </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Container>



      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userPage: state.userPage.userData
  }
}

function mapDispatchToProps(dispatch){
  return{
    getUserData: bindActionCreators(getUserData, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FollowUsersPage))
