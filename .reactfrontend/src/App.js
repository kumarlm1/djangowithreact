import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import {CardView,PopupView,ModalExampleModal} from './components/Leftbar';
import { Grid, Image ,Card ,Icon,Container, Header, List,Popup, Rating, Modal } from 'semantic-ui-react'
import Welcome from './Welcome'

function App () {
return (
  <Container style={{ margin: 20 }}>
    <Header as="h3">This example is powered by Semantic UI React😊</Header>
    <List bulleted>
      <List.Item
        as="a"
        content="💌 Official documentation"
        href="https://react.semantic-ui.com/"
        target="_blank"
      />
      <List.Item
        as="a"
        content="💡 StackOverflow"
        href="https://stackoverflow.com/questions/tagged/semantic-ui-react?sort=frequent"
        target="_blank"
      />
    </List>
    <PopupView></PopupView>
  
  </Container>
);
}

export default App;
