import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom'
import ResultPage from './component/Resultpage.js';
import {NewCard, DeckMaker} from './component/Deckmaker.js';

class App extends Component {
  render() {
    return (
      <Deck/>
    );
  }
}

const initialDeck =[{id: 0, question: '트와이스를 좋아합니까?', logic: ''},
{id: 1, question: '나연을 좋아합니까?', logic: ''},
{id: 2, question: '인간입니까?', logic: ''},
{id: 3, question: '테라포밍마스를 좋아합니까?', logic: ''},
{id: 4, question: '하스스톤을 즐겨합니까?', logic: ''},]

const testdis = [1, 0, '', 1, 0];

class Deck extends Component{
  constructor(props){
    super(props);
    let initialcount = new Uint8Array(initialDeck.length);
    let initialdisplay = new Array(initialDeck.length);
    let initialanswer = new Array(initialDeck.length);
    this.state = {card : initialDeck, displaycard: testdis, answer: initialanswer, selectedcount : initialcount };
    this.registerNewCard=this.registerNewCard.bind(this);
    this.selectcard=this.selectcard.bind(this);
  }

  registerNewCard(param){
    this.setState((previousState => ({
      card : [...previousState.card , param],
      displaycard : [...previousState.displaycard , ''],
      answer : [...previousState.answer , ''],
      selectedcount : [...previousState.selectedcount, 0]
    })));
  }

  selectcard(yesorno, num){
    const count = this.state.selectedcount;
    count[num] += yesorno;
  }



  render(){
    return(
      <Switch>
      <Route exact path = "/" render = {(props) =>
        <DisplayCard nowcard = {this.state.card} select = {this.selectcard} displayprop = {this.state.displaycard}
        />}/>
      <Route path = "/newcard" render = {(props) =>
        <div>
        <NewCard regNewCard = {this.registerNewCard} leng = {this.state.card.length}/>
        <DeckMaker nowcard = {this.state.card}/>
      </div>}/>
      <Route path = "/result" render = {(props) =>
        <div>
        <ResultPage nowcard = {this.state.card} selecteddata = {this.state.selectedcount}/>
      </div>}/>
      </Switch>
    )
  }
}


class DisplayCard extends Component{
  constructor(props){
    super(props);
    let displaynumber = new Array(this.props.nowcard.length);
    this.props.nowcard.map((props, index) => displaynumber[index] = props.id);
    this.state = {number : 0, displaycard : this.props.displayprop, displayid : displaynumber}
    this.handleClick = this.handleClick.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.newnumber = this.newnumber.bind(this);
  }

  handleClick(){
    let num = this.state.number
    let length = this.props.nowcard.length
    if(num<length-1){
      this.setState({number : num + 1})
    }
    else{
      alert('참여해주셔서 감사합니다.')
      this.setState({number : 0})
    }
  }

  newnumber(displaycard, displayid){
    for(let i= 0; i<displaycard.length; i++){
    if(displaycard[i] === 1){
      let temp = displaycard;
      displaycard[i] = 0;
      this.setState({number : displayid[i], displaycard : temp});
      break;
    }
    }

  }



  yes(){
    this.props.select(1, this.state.number);
    this.handleClick();
  }

  no(){
    this.props.select(0, this.state.number);
    this.handleClick();
  }

  render(){

    return(
      <div>
      <p> [지금 카드] </p>
      <p> 질문: {this.props.nowcard[this.state.number].question}</p>
      <button onClick = {this.yes }>Likey!</button>
      <button onClick = {this.no }>TT...</button>
      <Link to = '/newcard'><button> 카드제작하기</button></Link>
      <Link to = '/result'><button> 결과확인하기</button></Link>
      </div>
    )
  }
}


export default App;
