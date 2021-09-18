import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import logo from './logo.svg';




class Welcome extends Component {

    constructor(props) {
        super(props)

        this.state = {
            count: 0,
            message: "hi message from  welcome class",
            todoItems
        }
    }
    ChangeMessage = () => {
        this.setState((prevState) => ({

            count: prevState.count + 1
        }
        ))
    }

    render() {
        return (
            <main className="content">
                <div className="row">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <ul className="list-group list-group-flush">
                                {this.state.todoItems.map(item => (
                                    <div>
                                        <h1>{item.title}</h1>
                                        <span>{item.description}</span>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>


        )
    }
}

export default Welcome


const todoItems = [
    {
        id: 1,
        title: "Nature walk in the park",
        description: "Visit the park with my friends",
        completed: true
    },

    {
        id: 2,
        title: "Visit",
        description: "Got to my aunt's place",
        completed: true
    },

    {
        id: 3,
        title: "Write",
        description: "Do an article about anthropology",
        completed: true
    },
];