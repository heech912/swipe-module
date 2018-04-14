import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom'

class DeckMaker extends Component{
  constructor(props){
    super(props);
    }


  render(){
    const cardlist = this.props.nowcard;
    return cardlist.map((props)=><Card info = {props}/>)
  }
}

class Card extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<ul>
<li>{this.props.info.question}</li>
</ul>
    )
  }
}

class NewCard extends Component{
  constructor(props){
    super(props);
    this.state = {question : "저랑 보드게임 하실래요?"}
    this.handleInputChange=this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInputChange(event){
    const category = event.target.name;
    this.setState({[category] : event.target.value});
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

export {NewCard, DeckMaker, Card};
