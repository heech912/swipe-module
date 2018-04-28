import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom'
import {CurrentCard} from './EditCardLogic.js'
import '../App.css'

class DisplayDeck extends Component{
  constructor(props){
    super(props);
    }


  render(){
    let cardlist = this.props.cardPS;
    return cardlist.map((props)=><Card info = {props} />);
  }
}

class Card extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
<p class = 'card' draggable = "true" onClick = {()=>alert('dsf')}>{this.props.info.question}</p>
    )
  }
}

class NewCard extends Component{
  constructor(props){
    super(props);
    this.state = {id : this.props.leng, question : "저랑 보드게임 하실래요?",  logic : ''}
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event){
    this.setState({question : event.target.value});
  }

  handleClick(){
    this.props.regNewCard(this.state);
  }

  render(){
    return(
      <div>
      질문: <input type="text" name="question"  onChange={this.handleInputChange} value = {this.state.name}/><br/>
      <button onClick = {this.handleClick} >제출</button>
      <Link to = '/'><button>메인화면으로</button></Link>
      </div>
    )
  }
}

export {NewCard, DisplayDeck, Card};
