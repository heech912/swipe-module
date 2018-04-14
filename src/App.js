import React, { Component } from 'react';
import './App.css';
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

const initialDeck =[{question: '트와이스를 좋아합니까?', answer: '', display : ''},
{question: '나연을 좋아합니까?', answer: '', display : ''},
{question: '인간입니까?', answer: '', display : ''},
{question: '테라포밍마스를 좋아합니까?', answer: '', display : ''},
{question: '하스스톤을 즐겨합니까?', answer: '', display : ''},]


class Deck extends Component{
  constructor(props){
    super(props);
    const initialcount = new Uint8Array(initialDeck.length);
    this.state = {card : initialDeck, selectedcount : initialcount };
    this.registerNewCard=this.registerNewCard.bind(this);
    this.selectcard=this.selectcard.bind(this);
  }

  registerNewCard(param){
    this.setState((previousState => ({
      card : [...previousState.card , param],
      selectedcount : [...previousState.selectedcount, 0]
    })));
  }

  selectcard(yesorno, num){
    const count = this.state.selectedcount;
    console.log(count);
    count[num] += yesorno;
  }


  render(){
    {console.log(this.state.selectedcount)}
    return(
      <Switch>
      <Route exact path = "/" render = {(props) =>
        <DisplayCard nowcard = {this.state.card} select = {this.selectcard}/>}/>
      <Route path = "/newcard" render = {(props) =>
        <div>
        <NewCard regNewCard = {this.registerNewCard}/>
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
    super(props)
    this.state = {number : 0}
    this.handleClick = this.handleClick.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
  }

  handleClick(){
    const num = this.state.number
    const length = this.props.nowcard.length
    if(num<length-1){
      this.setState({number : num + 1})
    }
    else{
      alert('더이상 카드가 없습니다.')
      this.setState({number : 0})
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
