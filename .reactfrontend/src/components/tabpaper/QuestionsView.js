import React, { Component } from 'react'
import { STATE } from '../../GlobalData'
import createHash from 'object-hash'
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from './MyDocument'
export class QuestionsView extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isDataFetched : false,
             answersData : {}
        }
       
   
    }


    async componentDidMount(){
        var state = STATE.getState().questions
        var state_tab = STATE.getState().tabs
        let answersdata = {}
        let ids=[]
        Object.keys(state_tab).map((item,index)=>{
        if(STATE.getState().questions.hasOwnProperty(item)){
            Object.keys(state[item]).map((item,idx)=> { ids.push(item) })
        }})

     const promises = ids.map(async id=>{
        var url = ['http://127.0.0.1:8000/answer/']
         const response =  await fetch(url[0]+id).then(response=>response.json()).then(data=>data.result[0].answer)
            answersdata[id]={'answer':response}
                return 
             })   
       await Promise.all(promises) 
        
    this.setState({
        isDataFetched : true,
        answersData : answersdata
    })
}
      

        

    
   
    render() {
        
        return (
            <PDFViewer >
                {this.state.isDataFetched ?  
                   
                <MyDocument answers={this.state.answersData}></MyDocument>
               
    
                :
                'Loading'
                }
                 </PDFViewer>
               
                
            )
    }
}

export default QuestionsView
