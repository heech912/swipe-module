import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom'
import EditCardLogic from './EditCardLogic.js'
import '../App.css'

class DisplayDeck extends Component{
  constructor(props){
    super(props);
    this.state ={initialloc : ''}
    this.getinitialloc = this.getinitialloc.bind(this);
    this.changeorderPF2 = this.changeorderPF2.bind(this);
    }



getinitialloc(loc){
  this.setState({initialloc : loc});
}

changeorderPF2(loc){
  this.props.changeorderPF(this.state.initialloc, loc)
}

  render(){
    return (<div>
      <div class = 'test'>
      {this.props.orderPS.map((param)=><p class = "frame">
      <Card
      info = {this.props.cardPS[param]}
      location = {this.props.orderPS.indexOf(param)}
      getinitiallocPF = {this.getinitialloc}
      changeorderPF3 = {this.changeorderPF2}/></p>)}

      </div>
      </div>
    )
  }
}

class Card extends Component{
  constructor(props){
    super(props);
    this.state = {editingcard : ''};
    this.editstart = this.editstart.bind(this);
  }

  allowDrop(e){
    e.preventDefault();
  }

  editstart(){
    this.setState({editingcard : this.props.info.id})
  }

  render(){
    console.log(this.state.editingcard);
    return(
<p class = 'card'
 draggable = "true"
 onDragStart = {()=>this.props.getinitiallocPF(this.props.location)}
 onDragOver = {this.allowDrop}
 onDrop = {()=>this.props.changeorderPF3(this.props.location)}
 onDoubleClick = {this.editstart} >{this.props.info.question}</p>
    )
  }
}

class NewCard extends Component{
  constructor(props){
    super(props);
    this.state = {id : this.props.leng, question : "저랑 보드게임 하실래요?", pic : '', logic : ''}
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event){
    let target = event.target;
    let name = event.target.name;
    this.setState({[name] : event.target.value});
  }

  handlefileInput(event){
    let path = event.target.files[0];
    console.log(path);
  }

  handleClick(){
    this.props.regNewCard(this.state);
  }

  render(){
    return(
      <div>
      질문: <input type="text" name="question"  onChange={this.handleInputChange}/>
      <button><input type = "file" name = "pic" onChange={this.handlefileInput}/></button><br/>
      <button onClick = {this.handleClick} >제출</button>
      <Link to = '/'><button>메인화면으로</button></Link>
      </div>
    )
  }
}

export {NewCard, DisplayDeck, Card};
