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

const initialDeck =[{cardname: 'heech', cardage: "23", cardtwice : "나연"},
{cardname: 'heec324h', cardage: "22", cardtwice : " 임나연"},
{cardname: 'hee123ch', cardage: "231", cardtwice : "나북이"},
{cardname: 'hee1223ch', cardage: "2123", cardtwice : "나연"}
,{cardname: 'heec3h', cardage: "233", cardtwice : "나연누나"}]


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
      <p> 이름: {this.props.nowcard[this.state.number].cardname}</p>
      <p>  나이: {this.props.nowcard[this.state.number].cardage}</p>
      <p> 좋아하는 트와이스 멤버: {this.props.nowcard[this.state.number].cardtwice}</p>
      <button onClick = {this.yes}>좋아요!</button>
      <button onClick = {this.no }>다음기회에..</button>
      <Link to = '/newcard'><button> 카드제작하기</button></Link>
      <Link to = '/result'><button> 결과확인하기</button></Link>
      </div>
    )
  }
}


export default App;
