import React, { Component } from 'react';
import {Row} from 'react-materialize';
import $ from 'jquery';
import Dronecard from './DroneCard.js';
import Partscard from './PartsCard.js';
var _COUNTER = 0;

class BuildContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parts: [
        {
          name: '',
          price: '',
          link: '',
          category: ''
        }
      ]
    }
    this.iterateParts = this.iterateParts.bind(this);
  }

  loadPartsFromServer() {
    console.log(this.state.categories[0]);

  }



  loadCategoriesFromServer() {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3001/api/categories'
    })
    .then((res) => {
      this.setState({
        counter: _COUNTER
      })

      this.setState({
        currentPart: res.categories[this.state.counter],
        categories: res.categories
         });
      console.log(this.state.categories);
      $.ajax({
        method: 'GET',
        url: `http://localhost:3001/api/parts?category=${this.state.categories[this.state.counter]}`
      })
      .then((res) => {
        console.log(res.parts);
        this.setState({
          parts: res.parts
        });
      }, (err) => {
        console.log('get parts error', err)
      })
    }, (err) => {
      console.log('get categories error', err)
    });
  }

  componentDidMount() {
    this.loadCategoriesFromServer()
  }
  iterateParts(e){
    // increment counter to set firstWord to i + 1
    e.preventDefault();
    if(_COUNTER < 9){
      _COUNTER = _COUNTER + 1;
      this.setState({
        counter : _COUNTER,
        currentPart: this.state.categories[this.state.counter],
        categories: this.state.categories
      });
      console.log("You clicked next: ", _COUNTER);
      console.log(`${this.state.categories[this.state.counter]}`);
    $.ajax({
      method: 'GET',
      url: `http://localhost:3001/api/parts?category=${this.state.categories[this.state.counter]}`
    })
    .then((res) => {
      this.setState({
        parts: res.parts
      });
    }, (err) => {
      console.log('get parts error', err)
    })
  }
}
  render() {
    console.log(this.state.parts)
    return (
      <Row>
        <Dronecard />
        <Partscard
          iterateParts={this.iterateParts}
          currentPart={this.state.currentPart}
          parts={this.state.parts} />
      </Row>
    )
  }
}

export default BuildContainer;
