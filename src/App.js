import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Deck/>
    );
  }
}

const intialDeck =[{cardname: 'heech', cardage: "23", cardtwice : "나연"},
{cardname: 'heec324h', cardage: "22", cardtwice : " 임나연"},
{cardname: 'hee123ch', cardage: "231", cardtwice : "나북이"},
{cardname: 'hee1223ch', cardage: "2123", cardtwice : "나연"}
,{cardname: 'heec3h', cardage: "233", cardtwice : "나연누나"}]


class Deck extends Component{
  constructor(props){
    super(props);
    this.state = {card : intialDeck, selectedcard : [] };
    this.registerNewCard=this.registerNewCard.bind(this);
    this.selectcard=this.selectcard.bind(this);
  }

  registerNewCard(param){
    this.setState((previousState => ({
      card : [...previousState.card , param]}

    )));
  }

  selectcard(card){
    this.setState((previousState => ({
      selectedcard: [...previousState.selectedcard, card]
    })));
  }

  render(){
    return(<div>
      {console.log(this.state.selectedcard)}
      <NewCard regNewCard = {this.registerNewCard}/>
      <DisplayCard nowcard = {this.state.card} select = {this.selectcard}/>
      </div>
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
      </div>
    )
  }
}

class DisplayCard extends Component{
  constructor(props){
    super(props)
    this.state = {number : 0}
    this.handleClick = this.handleClick.bind(this);
    this.yes = this.yes.bind(this);
  }

  handleClick(){
    const num = this.state.number
    const length = this.props.nowcard.length
    if(num<length-1){
      this.setState({number : num + 1})
    }
    else{
      this.setState({number : 0})
    }
  }

  yes(){
    this.props.select(this.props.nowcard[this.state.number]);
    this.handleClick();
  }


  //편집페이지, 다자택일 설문조사//구글폼

  render(){
    return(
      <div>
      <p> [지금 카드] </p>
      <p> 이름: {this.props.nowcard[this.state.number].cardname}</p>
      <p>  나이: {this.props.nowcard[this.state.number].cardage}</p>
      <p> 좋아하는 트와이스 멤버: {this.props.nowcard[this.state.number].cardtwice}</p>
      <button onClick = {this.yes}>좋아요!</button>
      <button onClick = {this.handleClick }>다음기회에..</button>
      </div>
    )
  }
}





export default App;
