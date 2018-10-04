import React, { Component } from 'react'
import Header from './Header'
import MyShowsFavorites from './userprofile/00MyShowsFavorites'
import MyShowsNonFavorites from './userprofile/01MyShowsNonFavorites'
import FriendsSaying from './userprofile/02FriendsSaying'
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink, TabPane, TabContent, Container, Row, Col
} from 'reactstrap';
import { getAllSeries } from '../actions/userAllSeries'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import classnames from 'classnames';

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
    window.scrollTo(0, 0)
  }

  addSeriesInfo = async() => {
    const userId = Number(localStorage.getItem('id'))
    await this.props.getAllSeries(userId)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render(){
    return (
      <div>
        <Header />
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
              What Are Your Friends Watching?
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
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
              <FriendsSaying />
            </Col>
            </Row>
          </TabPane>
        </TabContent>
        </Container>

      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    getAllSeries: bindActionCreators(getAllSeries, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(UserProfile)
