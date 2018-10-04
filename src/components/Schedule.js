import React, { Component } from 'react'
import Header from './Header'
import Upcoming from './schedule/01Upcoming'
import Newest from './schedule/02Newest'
import { getAllSeries } from '../actions/userAllSeries'
import { connect } from 'react-redux'
import {
  Container, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink
} from 'reactstrap';
import { bindActionCreators } from 'redux'
import classnames from 'classnames';

class Schedule extends Component {
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
              Latest Episodes
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Upcoming
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Newest />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Upcoming />
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

export default connect(null, mapDispatchToProps)(Schedule)
