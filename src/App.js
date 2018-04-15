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

const initialDeck =[{id: 0, question: '트와이스를 좋아합니까?', answer: '', display : ''},
{id: 1, question: '나연을 좋아합니까?', answer: '', display : 1},
{id: 2, question: '인간입니까?', answer: '', display : 0},
{id: 3, question: '테라포밍마스를 좋아합니까?', answer: '', display : ''},
{id: 4, question: '하스스톤을 즐겨합니까?', answer: '', display : 1},]

const initialDeck2 =[{id: 0, question: '트와이스를 좋아합니까?', answer: '', display : ''},
{id: 1, question: '나연을 좋아합니까?', answer: '', display : 1},
{id: 2, question: '인간입니까?', answer: '', display : 0},
{id: 3, question: '테라포밍마스를 좋아합니까?', answer: '', display : ''},
{id: 4, question: '하스스톤을 즐겨합니까?', answer: '', display : 1},]


class Deck extends Component{
  constructor(props){
    super(props);
    const initialcount = new Uint8Array(initialDeck.length);
    this.state = {card : initialDeck, displaycard: initialDeck2, selectedcount : initialcount };
    this.registerNewCard=this.registerNewCard.bind(this);
    this.selectcard=this.selectcard.bind(this);
    this.restart = this.restart.bind(this);
  }

  registerNewCard(param){
    this.setState((previousState => ({
      card : [...previousState.card , param],
      displaycard : [...previousState.displaycard , param],
      selectedcount : [...previousState.selectedcount, 0]
    })));
  }

  selectcard(yesorno, num){
    const count = this.state.selectedcount;
    console.log(count);
    count[num] += yesorno;
  }

  restart(){
    this.setState(
      {displaycard : this.state.card}
    )
  }


  render(){
    {console.log(this.state.selectedcount)}
    return(
      <Switch>
      <Route exact path = "/" render = {(props) =>
        <DisplayCard nowcard = {this.state.displaycard} select = {this.selectcard} restart = {this.restart}/>}/>
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
    super(props)
    this.state = {number : 0, displaycard : this.props.nowcard}
    this.handleClick = this.handleClick.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.distinguish = this.distinguish.bind(this);
  }

  handleClick(){
    const num = this.state.number
    const length = this.props.nowcard.length
    if(num<length-1){
      this.setState({number : num + 1})
    }
    else{
      alert('참여해주셔서 감사합니다.')
      this.setState({number : 0})
    }
  }

  distinguish(){
    let temp = this.state.displaycard
    this.state.displaycard.map((props,index) => {
      if(props.display === 0){
        temp.splice(index, 1);
      }
    });
    this.setState({displaycard : temp});
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
      <button onClick = {this.distinguish}>test</button>
      {console.log(this.props.nowcard)}
      </div>
    )
  }
}


export default App;
