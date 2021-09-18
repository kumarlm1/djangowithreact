import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet ,Font} from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import SampleData from '../../jsonfilewithhierarchy-100.json'
import '../tab1/style.css'
import { string } from 'prop-types';
import { STATE } from '../../GlobalData';
import Latha from '../../fonts/Latha.ttf'
import TAM from '../../fonts/TAM-002.TTF'
import IndividualQuestionView from './IndividualQuestionView';

// const hyphenationCallback = (word) => {
//   console.log(word)
// }

// Font.registerHyphenationCallback(hyphenationCallback);

Font.register({ family: 'tamil1', src: Latha },{family:'tamil2',src:TAM}) ;

export const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4'
//   },
  fontss:{
    fontFamily:'tamil'
  },
  page: {
      height:'50vh',
    backgroundColor: "#ffffff"
  },
  long :{
    height : '50vh'
  },
  vlong :{
    height : '100vh'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  movieContainer: {
    
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10
  },
  header : {
    paddingLeft : 100 ,
    fontSize : 20
  }
});

// Create Document Component
export class MyDocument extends Component { 

      constructor(props) {
        super(props)
      
        this.state = {
           
        }
      }

  render(){
        var state = STATE.getState().questions
        var state_tab = STATE.getState().tabs
        var data_tab= Object.keys(state_tab).sort((first,second)=>{  return state_tab[first].position - state_tab[second].position })
    return (
      <Document >
         <Page size="A4" style={styles.page} >
            <View  key={111110} style={styles.header}>
            <Text key={111110} style={{fontFamily:'tamil1'}}> சமூக அறிவியல்  </Text>
            </View>
             
        { data_tab.map((item,index)=>{
             return(state.hasOwnProperty(item)?
             <View  key={index}>
               <Text style={{fontFamily:'tamil1',fontSize:'25px'}}>{state_tab[item].tabname}</Text>
              <IndividualQuestionView item={item} type='question' ></IndividualQuestionView>
            </View>
           
            :
            <View  key={index}>
        
            </View>
             )
        })}
    </Page>


    <Page size="A4" style={styles.page} >
            <View  key={111110} style={styles.header}>
            <Text key={111110} style={{fontFamily:'tamil1'}}> சமூக அறிவியல் Answers </Text>
            </View>
             
        { data_tab.map((item,index)=>{
             return(state.hasOwnProperty(item)?
             <View  key={index}>
               <Text style={{fontFamily:'tamil1',fontSize:'25px'}}>{state_tab[item].tabname}</Text>
              <IndividualQuestionView item={item} type='answer' key={item} answers={this.props.answers}></IndividualQuestionView>
            </View>
           
            :
            <View  key={index}>
        
            </View>
             )
        })}
    </Page>

  </Document>
)}
}
