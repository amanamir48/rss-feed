import React, { Component } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import '../css/styles.css';

function Feed(props){
    return (
        <div>
            <h4>{props.feed.title}</h4>
            <p>{props.feed.description}</p>
        </div>
    )
}

function FeedsList(props){
    if(props.feeds.length > 0){
        var list = props.feeds.map(function(feed){
            return (
              <ListGroup.Item>
                <Feed feed={feed} />
              </ListGroup.Item>
            )
        });
        return (
            <ListGroup>
                {list}
            </ListGroup>
        );
    } else {
        return null;
    }
}

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            feeds: props.feeds
        };
    }

    componentWillReceiveProps(props){
        this.setState({
            feeds: props.feeds
        });
    }

    render(){
        if(this.state.feeds){
            return (
                <div>
                    <div><h1>{this.state.feeds.data.feed.title}</h1></div>
                    <FeedsList feeds={this.state.feeds.data.items} />
                </div>
            );
        } else {
            return null;
        }
    }
}