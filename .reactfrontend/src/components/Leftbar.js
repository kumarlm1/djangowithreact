import React, { useState } from 'react'
import {Image ,Card ,Icon,Header, Button,Popup, Rating, Modal,Tab} from 'semantic-ui-react'
import LongCardView from './tab1/LongCardView'
import '../css/tabs.css'

export const CardView = () => (
   
      
    <Card centered href='https://react.semantic-ui.com/images/avatar/large/matthew.png'>

    <Card.Content>
      <Card.Header>Matthew</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>

  </Card>

 
  )
  // const RenderDivData =()=>{
  //   // const [index,setIndex] = useState('index')
  //    //console.log({index})
  // }
  // // export const LongCardView = () => {
  // //   const [index,setIndex] = useState(-1)


  // //   return(
  // //     <div className='tabss'> 
  // //   <Card  fluid
    
  // //   //href='#card-example-link-card'
  // //   header='Elliot Baker'
  // //   meta='Friend'
  // //   description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
  // //   onClick={()=>{
  // //     setIndex(1)
  // //     RenderDivData()}}
  // // />
  // // <div id="content"></div>
  // // </div> 
 
  // // )
  // //   }

 export const PopupView = () => (
     
    <Popup
      trigger={
        <Card>
          <Image src='https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg' />
          <Card.Content>
            <Card.Header>My Neighbor Totoro</Card.Header>
            <Card.Description>
              Two sisters move to the country with their father in order to be
              closer to their hospitalized mother, and discover the surrounding
              trees are inhabited by magical spirits.
            </Card.Description>
          </Card.Content>
        </Card>
      }
    >
      <Popup.Header>User Rating</Popup.Header>
      <Popup.Content>
        <Rating icon='star' defaultRating={3} maxRating={4} />
      </Popup.Content>
    </Popup>
  )
  
  
 export function ModalExampleModal() {
    const [open, setOpen] = useState(false)
  
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Modal</Button>}
      >
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' wrapped />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>
              We've found the following gravatar image associated with your e-mail
              address.
            </p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => setOpen(false)}>
            Nope
          </Button>
          <Button
            content="Yep, that's me"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    )
  }
  
  const panes = [
    { menuItem: '1 Marks ', render: () => <Tab.Pane>
      
      <PopupView></PopupView>
    
    <LongCardView></LongCardView>
    <LongCardView></LongCardView>
    <LongCardView></LongCardView><LongCardView></LongCardView><LongCardView></LongCardView>
    <LongCardView></LongCardView>
   

    {/* <LongCardView></LongCardView> */}
   
    {/* <CardView></CardView>
    <CardView></CardView>
    <CardView></CardView>
    <CardView></CardView>
    <CardView></CardView>
    <CardView></CardView>
    <CardView></CardView> */}
    
    
    </Tab.Pane>
     },
    { menuItem: 'Tab 2', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
    { menuItem: 'Tab 3 ', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
  ]

  export const TabExampleBasic = () => <Tab 
  
  panes={panes} />


