import React, { Component } from 'react'
import LongCardView from './LongCardView'
//import SampleData from '../../jsonfilewithhierarchy-100.json'
//import { Button } from 'react-bootstrap'
import { STATE , ACTIONCALLS} from '../../GlobalData'
import { Button, Tab} from 'react-bootstrap'
import { LocalStorageRedux } from '../LocalStorageRedux'
import {Input} from 'semantic-ui-react'

class ListCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             lessions : [],
             
             
        }
        this.friendOptions = []
        this.createDropDown()
        
    }
    
    createDropDown(){
       
        for(var i=1;i<=STATE.getState().tabs[this.props.catid].noofqns;i++){
           this.friendOptions.push({
                  key: i,
                  text: i,
                  value: i,
                  //image: { avatar: true, src: '/images/avatar/small/matt.jpg' },
                } )
        }
    }
    OnClickHandler =()=>{
        
       console.log(STATE.getState())
      // console.log(STATE.getState().tabs[this.props.catname].noofqns)
            
    }
    OnClickHandler1=()=>{
        LocalStorageRedux.removeAllLocalStorageData()
    }
    async componentDidMount(){


        var tabid = this.props.catid
      
        let lessionsdata = [];
        if (  STATE.getState().lessions.length !== 0) {
            lessionsdata = STATE.getState().lessions
      
         }
        else{
        var url = ['http://127.0.0.1:8000/lession','https://api.randomuser.me/']
        lessionsdata = await fetch(url[0])
        .then(response=>response.json())
        .then(data=>{
            var individualData = {}
                    data.result.map(item=>{
                        item['count'] = { [tabid] : 0}
                        individualData[item.id]=item
                        
                    })
            return individualData        
        });
   
        const dispatchAction=ACTIONCALLS.addLessions
        dispatchAction['info'] = { 'payload' : lessionsdata  }
        STATE.dispatch(dispatchAction)
    
   }
   this.setState({
    lessions : lessionsdata
    })
    }
    render() {
       
        return (
            <div>
                <Button onClick = {this.OnClickHandler}>Show State</Button>
                <Button onClick = {this.OnClickHandler1}>remove Local Storage</Button>
                <Input placeholder = 'No of Questions ' type="number"></Input>
              
                {Object.keys(this.state.lessions).map( (data,index) =>{
                  
                    return(
                    <LongCardView options={this.friendOptions} key={this.state.lessions[data].id} item={this.state.lessions[data]} catid={this.props.catid}
                   />
                )
                    }
                )}
            </div>
        )
    }
}

export default ListCard 
