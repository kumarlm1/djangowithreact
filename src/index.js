import React from 'react';
import ReactDOM from 'react-dom';

// import Apps from './App';
import registerServiceWorker from './registerServiceWorker';

import { TabBasic } from './components/tabs';



import { Container} from "semantic-ui-react";


const App = ({ children }) => (
    <div>scscscscsc</div>
);

// ReactDOM.render(<Header/>, document.getElementById('header'));
// ReactDOM.render(<Footer />, document.getElementById('footer'));

ReactDOM.render(<App></App>, document.getElementById('root'));
// ReactDOM.render(<CardView></CardView>, document.getElementById('root1'));
// ReactDOM.render(<App/>, document.getElementById('rightsidebar'));
registerServiceWorker();
