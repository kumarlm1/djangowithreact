import React, { Component } from 'react'
import { List} from 'semantic-ui-react'
import createHash from 'object-hash'
import SingleDetailView from './SingleDetailView'
import { STATE ,ACTIONCALLS} from '../../GlobalData'
class ShowCardDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            questions : [],
            
        }
    
    }
    async componentDidMount(){
        let lessionsdata = [];
        var Tabid = this.props.catid
        // if (STATE.getState().qns.hasOwnProperty(this.props.item.id)) {
        //     lessionsdata = STATE.getState().qns[this.props.item.id]
          
            
        // }
        {
        var url = ['http://127.0.0.1:8000/question/','https://api.randomuser.me/','http://127.0.0.1:8000/tab/']


       // console.log(url[2]+Tabid+'/',this.props.item)
        lessionsdata = await fetch(url[2]+Tabid+'/'+this.props.item.id)
        .then(response=>response.json())
        .then(data=>{
           // console.log(data)
        return data.result
       
        });
   
        const dispatchAction=ACTIONCALLS.insertQuestions
        dispatchAction['info'] = { 'id' : this.props.item.id , 'payload':lessionsdata }
        STATE.dispatch(dispatchAction)
     
   }
   this.setState({
    questions : lessionsdata
    })
}
    
    render() {
     
        return (
            <div className="xl" >
             <List divided  verticalAlign='middle' >
             { 
              this.state.questions.length > 0 ?
                this.state.questions.map(item =>(
                 <SingleDetailView options={this.props.options} catid={this.props.catid}  key={createHash(item)} {...item} from={this.props.item.id} handler={this.props.handler}></SingleDetailView>
             ))
             :
             <div>Sorry no data </div>
            }
             </List>
            </div>
        )
    }
}

export default ShowCardDetails 
