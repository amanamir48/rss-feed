import React, { Component } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import '../css/styles.css';
function Item(props){
  if(props.item){
    return (
      <div>
          <h3>{props.item.url}</h3>
      </div>
    );
  } else {
    return null;
  }
}

function ListItem(props){
  if(props.items.length > 0){
    var list = props.items.map(function(item){
      return (
        <ListGroup.Item className="list-item" action key={item.id} onClick={() => props.onItemClickHandler(item)}>
          <Item item={item} onRemove={props.onRemove}/>
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
  constructor(props) {
    super(props);
    this.state = {
      newURL: '',
      selected: null,
      URLList: []
    }
    
  }

  handleChange(event){
    this.setState({
      [event.target.id] : event.target.value
    });
  }

  addURL(){
    if(this.state.newURL !== ''){
      fetch(this.state.newURL)
      .then(function(response) {
        return response.json();
      });
      var newURL = {
        id: new Date().valueOf(),
        url: this.state.newURL
      };
      var URLList = this.state.URLList;
      URLList.unshift(newURL);
      this.setState({
        URLList: URLList,
        newURL: '',
        selected: newURL
      });
    }
  }

  render() {
    return (
      <>
        <Container className="h-100">
            <Row>
              <Col>
                <h2>RSS-FEEDS</h2>
              </Col>
            </Row>
            <Row className="h-100-70">
            <Col>
              <div className="parent-container">
                <div className="left-panel">
                  <div className="form-container">
                    <Form.Group controlId="newURL">
                        <Form.Control 
                        bsPrefix="xsmall-control form-control"
                        size="sm"
                        type="text"
                        placeholder="Enter URL"
                        value={this.state.newURL}
                        onChange={this.handleChange.bind(this)}/>
                    </Form.Group>
                    <Button
                        variant="primary"
                        className="btn_primary"
                        size="sm"
                        onClick={this.addURL.bind(this)}
                    >Add</Button>
                  </div>
                  <ListItem items={this.state.URLList} selected={this.state.selected} />
                </div>
                <div className="right-panel">
                  <h1>right-panel</h1>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}