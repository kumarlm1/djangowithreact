import React ,{Component}from "react";
import ListCard from "./tab1/ListCard";
import { Tab } from "semantic-ui-react";
import '../components/tab1/style.css'
import QuestionsView from "./tabpaper/QuestionsView";
import { StyleSheet } from '@react-pdf/renderer';
import SettingsView from "./tabpaper/SettingsView";
import { STATE ,ACTIONCALLS} from "../GlobalData";



const panes = [
    { menuItem: 'from tabs ', render: () => <Tab.Pane >
        <ListCard></ListCard>
        </Tab.Pane>
     },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3 ', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
    { menuItem: 'Tab 3 ', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },

    { menuItem: 'Paper ', render: () => <Tab.Pane><QuestionsView></QuestionsView></Tab.Pane> },
  ]


  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
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
      backgroundColor: "#f6f6f5",
      display: "flex",
      flexDirection: "row",
      padding: 5
    },
  });

export class TabBasic extends Component{
  constructor(props) {
    super(props)
  
    this.state = {
       data : []
    }
    this.count = 1
  }

  async componentDidMount(){
   
    
    await fetch('http://127.0.0.1:8000/tab')
    .then(response => response.json())
    .then(datas =>{ 
      let pane=[]
      let tabsWithPosition = {}
      pane.push({menuItem:'Settings', render: () => <Tab.Pane style={styles.vlong} >
        <SettingsView panes={tabsWithPosition}></SettingsView>
      </Tab.Pane>})

       
     
       datas.result.map(item=>{
          pane.push({menuItem: item.name, render: () => <Tab.Pane key={item.id}>
          <ListCard catid={item.id} catname={item.name}></ListCard>
          </Tab.Pane>})
          tabsWithPosition={...tabsWithPosition,[item.id]:{name:item.name,position:this.count,tabname:item.name,noofqns:10}}
          this.count++ 
       })
       pane.push({menuItem:'Paper', render: () => <Tab.Pane style={styles.vlong} >
      <QuestionsView style={styles.long}></QuestionsView>
      </Tab.Pane>})
      
      
       console.log(pane)

      var dispatchAction = {}
      dispatchAction = ACTIONCALLS.addTabs
      dispatchAction['tabs'] = tabsWithPosition
      STATE.dispatch(dispatchAction)
      this.setState({
      data : pane}) 
      }
    )

  }
  render() {
    return (
      
         <Tab  panes={this.state.data} >
    
        </Tab>
     
    )
  }
}

export default TabBasic


// export const globalStateContext = React.createContext(globalState);

 
  