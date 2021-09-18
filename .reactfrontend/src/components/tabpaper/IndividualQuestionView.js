import React, { Component } from 'react'

import { Text, View,} from '@react-pdf/renderer';
import '../tab1/style.css'
import { STATE } from '../../GlobalData';
import { styles } from './MyDocument';
export class IndividualQuestionView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            
        }
    }
    render() {
       
         var state = STATE.getState().questions
         var data= Object.keys(state[this.props.item]).sort((first,second)=>{  return state[this.props.item][first].positionAdded - state[this.props.item][second].positionAdded })
       
         return (
                data.map((item,index)=>{
           
             return(
                  
              <View key={state[this.props.item][item].id} style={styles.movieContainer}>
              <Text  style={{fontFamily:'tamil1',fontSize:'10px'}}>
                  {state[this.props.item][item].positionAdded}.)<pre> </pre>   
                   {this.props.type === 'answer' ? this.props.answers[item].answer : state[this.props.item][item].question }
                  </Text>
              </View>
              
              )
  
              })
        )
    }
}

export default IndividualQuestionView
