import React, { Component } from 'react'
import { Image ,Card ,Icon } from 'semantic-ui-react'
export default class Fetchposts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             Fetched:false,
             data : null
        }
    }
    componentWillUnmount(){
        fetch('http://127.0.0.1:8000/posts')
        .then(response => response.json())
        .then(data =>{ 
            console.log(data);
          this.setState({ data:data,found:true })});
    }
    
    render() {
        this.componentWillUnmount()
        var RenderData = null ;
       this.state.Fetched ? 
        RenderData =  this.state.data.map(posts => (
            <Card>
            <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
              <Card.Header>{posts.title}</Card.Header>
              <Card.Meta>
                <span className='date'>Created at {posts.created}</span>
              </Card.Meta>
              <Card.Description>
                {posts.body}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name='user' />
                22 Friends
              </a>
            </Card.Content>
          </Card>
        ))
        
        :
        
            RenderData = 'Sorry No data avaliable....'  
        

        return RenderData
        
    }
}
