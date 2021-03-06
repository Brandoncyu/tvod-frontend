import React, { Component } from 'react'
import Header from './Header'
import ActivityList from './userprofile/00ActivityList/01ActivityList'
import MyShowsFavorites from './userprofile/00MyShowsFavorites'
import MyShowsNonFavorites from './userprofile/01MyShowsNonFavorites'
import FriendsSaying from './userprofile/02FriendsSaying'
import Upcoming from './userprofile/03Upcoming'
import Newest from './userprofile/04Newest'
import {
  Nav, NavItem, NavLink, TabPane, TabContent, Container, Row, Col
} from 'reactstrap';
import { getAllSeries, clearAllSeries } from '../actions/userAllSeries'
import { getUserData, clearUserData } from '../actions/followUsersPage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames';
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';

class UserProfile extends Component {
  constructor(props) {
   super(props);

   this.toggle = this.toggle.bind(this);
   this.state = {
     activeTab: '1'
   };
 }

  componentDidMount(){
    this.addSeriesInfo()
    this.findUser()
    window.scrollTo(0, 0)
  }

  componentWillUnmount(){
    this.props.clearAllSeries()
    this.props.clearUserData()
  }

  addSeriesInfo = async() => {
    const userId = Number(localStorage.getItem('id'))
    await this.props.getAllSeries(userId)
  }

  findUser = async () => {
    const userName = localStorage.getItem('username')
    const id = localStorage.getItem('id')
    await this.props.getUserData(userName, id)
    // await this.dispatch(getUserData(userName, id))
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render(){
    if (!this.props.allSeries || !this.props.userPage){
      return (<div>
        <Header />
        <ReactSpinner />
        </div>)
    }
    return (
      <div>
        <Header />
        <Container className="backcolor">
          <Row>
            <Col md="4" className="mr-4 my-4 d-flex align-items-center">
              <img width="400" className="rounded-circle" src={this.props.userPage.image} alt="user card" />
            </Col>
            <Col className="ml-4">
              <br />
              <h1>Welcome Back, {this.props.userPage.firstname}!</h1>
              <p>Your Recent Activity:</p>
              <ActivityList />
            </Col>
          </Row>
        </Container>
        <Container className="backcolor">
        <br />
        <Nav className="backcolor" tabs>
          <NavItem>
            <NavLink

              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Favorite Shows
            </NavLink>
          </NavItem>
          <NavItem className="linkProp">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Other Shows
            </NavLink>
          </NavItem>
          <NavItem className="linkProp">
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Just Aired
            </NavLink>
          </NavItem>
          <NavItem className="linkProp">
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Airing This Week
            </NavLink>
          </NavItem>
          <NavItem className="linkProp">
            <NavLink
              className={classnames({ active: this.state.activeTab === '5' })}
              onClick={() => { this.toggle('5'); }}
            >
              What Are Your Friends Watching?
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent className="backGrey" activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <MyShowsFavorites />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <MyShowsNonFavorites />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                <Newest />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                <Upcoming />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="5">
            <Row>
              <Col sm="12">
                <FriendsSaying />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
        <br />
        </Container>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allSeries: state.allSeries.allSeries,
    userPage: state.userPage.userData
  }
}

function mapDispatchToProps(dispatch){
  return {
    // dispatch
    getUserData: bindActionCreators(getUserData, dispatch),
    clearUserData: bindActionCreators(clearUserData, dispatch),
    getAllSeries: bindActionCreators(getAllSeries, dispatch),
    clearAllSeries: bindActionCreators(clearAllSeries, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
