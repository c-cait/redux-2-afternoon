import React, { Component, useReducer } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import {connect} from 'react-redux';
import {requestUserData} from '../../ducks/userReducer';
import {requestBudgetData, addPurchase, removePurchase} from '../../ducks/budgetReducer';


class Budget extends Component {

  componentDidMount(){
    //when the component mounts, the action creator is invoked
    //the reducer function fires
    //the state is updates accordingly -> in the redux store
    this.props.requestUserData()
    this.props.requestBudgetData()
  }


  render() {
    //destructure the loading property from the budget object
    //budget object was mapped to props through mapStateToProps/connect
    const {loading, purchases, budgetLimit} = this.props.budget;
    const {firstName, lastName} = this.props.user
    return (
      <Background>
        {/* depending on the state of loading we will display 
        the loading component or not */}
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName}/>
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase  addPurchase={this.props.addPurchase}/>
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase}/>
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit}/>
              <Chart2 purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

//this fxn takes in the redux store state & maps the budget reducer info
//from the redux store to a budget key on this components props object
function mapStateToProps(state){
  return {
    budget: state.budget,
    user: state.user
  }
}

//now all store values managed by the budgetReducer are now on this.props.budget
//on this Budget component
export default connect(mapStateToProps, {requestUserData, requestBudgetData, addPurchase, removePurchase})(Budget)
