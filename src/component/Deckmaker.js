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
<li>{this.props.info.cardname}</li>
<li>{this.props.info.cardage}</li>
<li>{this.props.info.cardtwice}</li>
</ul>
    )
  }
}

class NewCard extends Component{
  constructor(props){
    super(props);
    this.state = {cardname : "heech", cardage: 23, cardtwice : "나연"}
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
      이름: <input type="text" name="cardname"  onChange={this.handleInputChange} value = {this.state.name}/><br/>
      나이: <input type="number" name="cardage"  onChange={this.handleInputChange} value = {this.state.age}/><br/>
      좋아하는 트와이스 멤버:  <select name="cardtwice"onChange ={this.handleInputChange} value = {this.state.twice}>
      <option value="나연">나연</option>
      <option value="임나연">임나연</option>
      <option value="나연누나">나연누나</option>
      <option value="나북이">나북이</option>
      </select><br/>
      <button onClick = {this.handleClick} >제출</button>
      <Link to = '/'><button>메인화면으로</button></Link>
      </div>
    )
  }
}

export {NewCard, DeckMaker, Card};
