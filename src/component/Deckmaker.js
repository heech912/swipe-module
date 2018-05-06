import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom'
import {CurrentCard} from './EditCardLogic.js'
import '../App.css'

class DisplayDeck extends Component{
  constructor(props){
    super(props);
    this.state ={initialloc : 3}
    this.allowDrop = this.allowDrop.bind(this);
    this.getinitialloc = this.getinitialloc.bind(this);
    }

allowDrop(e){
  e.preventDefault();
}

getinitialloc(loc){
  this.setState({initialloc : loc});
}

  render(){
    return (<div>
      {this.props.orderPS.map((param)=><p class = "frame"
      onDragOver = {this.allowDrop}
      onDrop = {()=>alert('dropped~!')} >
      <Card
      info = {this.props.cardPS[param]}
      location = {this.props.orderPS.indexOf(param)}
      getinitiallocPF = {this.getinitialloc} /></p>)}
      <p class = "frame"/>
      </div>
    )
  }
}

class Card extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
<p class = 'card' draggable = "true" onDragStart={this.props.getinitiallocPF(this.props.location)}>{this.props.info.question}</p>
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
