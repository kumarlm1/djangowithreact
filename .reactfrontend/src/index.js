import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import Apps from './App';
import registerServiceWorker from './registerServiceWorker';
import {CardView} from './components/Leftbar';
import { TabBasic } from './components/tabs';
import Fetchposts from './components/Fetchposts'
import { LocalStorageRedux } from './components/LocalStorageRedux';


import { Container, Header, List } from "semantic-ui-react";
import QuestionsView from './components/tabpaper/QuestionsView';
const aas = new LocalStorageRedux() 

const App = ({ children }) => (
    <Container style={{ margin: 10 }}>
  
   <TabBasic></TabBasic>

    { /* {children} */ }
    
  </Container>
);

// ReactDOM.render(<Header/>, document.getElementById('header'));
// ReactDOM.render(<Footer />, document.getElementById('footer'));

ReactDOM.render(<App><CardView/><Fetchposts/></App>, document.getElementById('root'));
// ReactDOM.render(<CardView></CardView>, document.getElementById('root1'));
// ReactDOM.render(<App/>, document.getElementById('rightsidebar'));
registerServiceWorker();
