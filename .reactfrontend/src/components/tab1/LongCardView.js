import React, { Component } from 'react'
import { Card,Button} from 'semantic-ui-react'
import { ACTIONCALLS, ACTIONS ,STATE } from '../../GlobalData'
import ShowCardDetails from './ShowCardDetails'
import './style.css'

export class LongCardView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             clicked : false,
             hasToFetchData : true,
             noOfQuestions : 0 
            }

      if(STATE.getState().lessions[this.props.item.id].count.hasOwnProperty(this.props.catid) ) {
        this.state.noOfQuestions = STATE.getState().lessions[this.props.item.id].count[this.props.catid]
      } 
       
    }
    
    OnClickHandler =props=>{
            this.setState((prev)=>({
                clicked : !prev.clicked,
                hasToFetchData : false
            }))
       
    }
    StoreInRedux(count){
      const dispatchAction={}
      var existingCount=0
      if(STATE.getState().lessions[this.props.item.id].count.hasOwnProperty(this.props.catid) ) {
        existingCount = this.state.noOfQuestions = STATE.getState().lessions[this.props.item.id].count[this.props.catid]
      } 
     
      dispatchAction['info']={  'tabid':this.props.catid , 'cnt':existingCount+count , 'id':this.props.item.id }
      dispatchAction['type'] = ACTIONS.CHANGE_LESSION_QUESTION_COUNT

      STATE.dispatch(dispatchAction)
     }
    changenoOfQuestions=(isAdded)=>{

      if(isAdded){var addedValue = 1}
      else addedValue = -1
      this.StoreInRedux(addedValue)
      this.setState((prev)=>({
              ...prev,
              noOfQuestions : prev.noOfQuestions+ addedValue
      }))
  }

    render() {
       
        return (
        <div> 
          <Card fluid className="md">
        <Card.Content  
         link = "true"
        onClick={()=>{this.OnClickHandler(this.props.item)}}
         >
        <Card.Header>{this.props.item.name}</Card.Header>
        <Button  floated='right' circular>{this.state.noOfQuestions}</Button>
        <Card.Meta>{this.props.item.division__name}</Card.Meta>
        <Card.Description>
        {this.props.item.description}
        </Card.Description>
         
           
         </Card.Content>
        </Card>
        <div style={{display : this.state.clicked ? "block": "none" , color:'green'}}>
          {  !this.state.hasToFetchData ?
        <ShowCardDetails options={this.props.options} item={this.props.item} catid={this.props.catid} handler={this.changenoOfQuestions}/> 
        :
        <p>
          Sorry no data 
        </p>
          }
        </div>
        </div> 
 
        )
    }
}

export default LongCardView
