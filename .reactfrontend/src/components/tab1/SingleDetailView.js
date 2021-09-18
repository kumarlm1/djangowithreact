import React, { Component } from 'react'
import { List,Button,Form,Dropdown} from 'semantic-ui-react'
import { STATE , ACTIONCALLS, ACTIONS } from '../../GlobalData'

class SingleDetailView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            isAdded : false,
            positionAdded : null 
            
        }
        this.change = {
            positionAdded : null
        }
     
        
       if(STATE.getState().questions.hasOwnProperty(this.props.catid))
       {  
       if(STATE.getState().questions[this.props.catid].hasOwnProperty(this.props.id)){
       this.state.isAdded = true
       this.state.positionAdded = STATE.getState().questions[this.props.catid][this.props.id].positionAdded
       this.change.positionAdded = this.state.positionAdded
        }
    }
}

    storeOrRemoveData(){

        const dispatchAction={}
        var data = {...this.props}
        delete data['options']
        delete data['handler']
        data['from'] = this.props.catid
        dispatchAction['info'] = 
        {  
   
        'payload':{...data,['positionAdded']:this.state.positionAdded} }

        if(this.state.isAdded)
            dispatchAction['type'] = ACTIONS.ADD_QUESTION
        else {
            
           dispatchAction['type'] = ACTIONS.REMOVE_QUESTION
        }
        STATE.dispatch(dispatchAction)

        
    }
    
    
      
    dropDownOnChange=data=>{
          this.change = {
              positionAdded : data.value
          }
      }
      
    toggleAddedButton=()=>{


          if(this.change.positionAdded !== null)
        this.setState(prev=>({
            isAdded : !prev.isAdded ,
            positionAdded : this.change.positionAdded }),
        // callback function
        ()=>{  
            this.props.handler(this.state.isAdded),
            this.storeOrRemoveData()
        }
      
        )
        
    }

    render() {
        return (
            <List.Item style={{margin:"20px"}} className="xl">
            <List.Content  floated='right' middlestyle={{margin:"20px"}}>
               
              
                <Button.Group size='big'>
                
                <Button  
                onClick={()=>{this.toggleAddedButton()}} 
                 color={this.state.isAdded ?  'red' :'green'}>
                {this.state.isAdded ? 'Remove' : 'Add'}
                </Button>
               
                <Button.Or text='as'/>
             
                 <Button >
                     {this.state.isAdded ?<div><Dropdown placeholder=''
                         pointing='left'
                         defaultValue={this.props.options[this.state.positionAdded-1].value}
                         disabled
                        options={this.props.options} />
                </div>
                 : 
                 <div><Dropdown placeholder=''
                         pointing='left'
                         search
                         onChange = { (event,data)=>{ this.dropDownOnChange(data)}}
                        options={this.props.options} />
                </div>} 
                 </Button>
                 </Button.Group>
            
            </List.Content>
            <List.Content
                icon ='github' size='large' verticalAlign='middle'
                header = {this.props.question}
                description = {this.props.answers}
            />
            </List.Item> 
        )
    }
}

export default SingleDetailView 
