import { keys } from 'object-hash'
import React, { Component } from 'react'
import {Button, Card,Input} from 'semantic-ui-react'
import { STATE,ACTIONS } from '../../GlobalData'

export class SettingsView extends Component {
    constructor(props) {
        super(props)
        
        this.state = {

            data : ['Settings','Paper'],
            tabsWithPosition :STATE.getState().tabs
             
        }
        
    }
    changePositionUp=(name,position)=>{
        
        if(position > 1 && position < Object.keys(this.state.tabsWithPosition).length){}

        var dispatchAction = {}
        dispatchAction['name'] = name
        dispatchAction['type'] = ACTIONS.CHANGE_TAB_POSITION
        dispatchAction['position'] = 1
        STATE.dispatch(dispatchAction)
        this.setState({
            tabsWithPosition :STATE.getState().tabs
        }
    )

    }

    changePositionDown=(name,position)=>{
        let data = STATE.getState().tabs
        var state = STATE.getState().tabs
        Object.keys(data).sort((first,second)=>{  return state[first].position - state[second].position })
        console.log(Object.keys(data))

    }
    changeName(name,e){
        console.log(name,e.value)
        var dispatchAction = {}
        dispatchAction['name'] = name
        dispatchAction['type'] = ACTIONS.CHANGE_TAB_NAME
        dispatchAction['tabname'] = e.value
        STATE.dispatch(dispatchAction)
        this.setState({
            tabsWithPosition :STATE.getState().tabs
        })
       }

    changeQnsCount(name,e){
        console.log(name,e.value)
        if(e.value != NaN){
        var dispatchAction = {}
        dispatchAction['name'] = name
        dispatchAction['type'] = ACTIONS.CHANGE_TAB_QNSCOUNT
        dispatchAction['noofqns'] = parseInt(e.value)
        STATE.dispatch(dispatchAction)
        this.setState({
            tabsWithPosition :STATE.getState().tabs
        }
    
        )
    }
       
    }
    render() {

        var state = STATE.getState().tabs
              
        var data= Object.keys(state).sort((first,second)=>{  return state[first].position - state[second].position })

        return (
            <div>
                ARRANGE IN ORDER 
               { data.map((item,idx)=>{
                  
                   return (
                       
                       <Card fluid key={item} className="md">
                           <Card.Content>
                             <Card.Header>{state[item].name}</Card.Header> 
                                
                             NO of Questions:<Input  type='number' 
                             value={state[item].noofqns}
                             onChange={(e,data)=>{this.changeQnsCount(item,data)}}></Input>
                             Tab Name:<Input  type='text' 
                             value={state[item].tabname}
                            
                             onChange={(e,data)=>{this.changeName(item,data)}}></Input>
                             <Button.Group floated='right'>
                             <Button onClick={()=>{this.changePositionUp(item,state[item].position)}} color='green'>
                                 UP
                             </Button>
                    
                             <Button onClick={()=>{this.changePositionDown(item,state[item].position)}} color='red'>
                                 DOWN
                             </Button>
                             </Button.Group>
                           
                           </Card.Content>


                       </Card>
                           
                       
                       
                   )
               })} 
            </div>
        )
    }
}

export default SettingsView
