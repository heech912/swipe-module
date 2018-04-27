import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch, Redirect } from 'react-router-dom'
import ResultPage from './component/Resultpage.js';
import {NewCard, DeckMaker} from './component/Deckmaker.js';

class App extends Component {
  render() {
    return (
      <Deck/>
    );
  }
}

const initialDeck =[{id: 0, question: '나연을 좋아합니까?', logic: ''},
{id: 1, question: '정연을 좋아합니까?', logic: ''},
{id: 2, question: '사나를 좋아합니까?', logic: ''},
{id: 3, question: '모모를 좋아합니까?', logic: ''},
{id: 4, question: '지효를 좋아합니까?', logic: ''},
{id: 5, question: '미나를 좋아합니까?', logic: ''},
{id: 6, question: '다현을 좋아합니까?', logic: ''},
{id: 7, question: '채영을 좋아합니까?', logic: ''},
{id: 8, question: '쯔위를 좋아합니까?', logic: ''},
{id: 9, question: '트와이스를 좋아합니까?', logic: ''},]

const testdis = [0, 1, '', 1, 0, 1, '', '', 1, 0];
const testdis2 = [0,0,0,0,0,0,0,0,0,0];

class Deck extends Component{
  constructor(props){
    super(props);
    let initialcount = new Uint8Array(initialDeck.length);
    let initialdisplaystatus = new Array(initialDeck.length);
    let initialanswerstatus = new Array(initialDeck.length);
    this.state = {
      card : initialDeck,
      displaystatus: testdis,
      answerstatus: initialanswerstatus,
      count : initialcount,
      restart : 0 
    };
    this.registerNewCard=this.registerNewCard.bind(this);
    this.selectcard=this.selectcard.bind(this);
  }

  registerNewCard(param){
    this.setState((previousState => ({
      card : [...previousState.card , param],
      displaystatus : [...previousState.displaystatus , ''],
      answerstatus : [...previousState.answerstatus , ''],
      count : [...previousState.count, 0]
    })));
  }

  selectcard(yesorno, num){
    const count = this.state.count;
    count[num] += yesorno;
  }



  render(){
    return(
      <Switch>
      <Route exact path = "/" component = {InitialPage}/>
      <Route path = "/selectcard" render = {(props) =>
        <SelectCard cardprops = {this.state.card} select = {this.selectcard} displaystatusprop = {this.state.displaystatus}
        />}/>
      <Route path = "/newcard" render = {(props) =>
        <div>
        <NewCard regNewCard = {this.registerNewCard} leng = {this.state.card.length}/>
        <DeckMaker cardprops = {this.state.card}/>
      </div>}/>
      <Route path = "/result" render = {(props) =>
        <div>
        <ResultPage cardprops = {this.state.card} selecteddata = {this.state.count}/>
      </div>}/>
      </Switch>
    )
  }
}

class InitialPage extends Component{
  constructor(props){
    super(props);
  }

render(){
  return(
    <div>
    <Link to = '/selectcard'><button> 설문조사시작! </button></Link>
    <Link to = '/newcard'><button> 카드제작하기</button></Link>
    <Link to = '/result'><button> 결과확인하기</button></Link><br/>
    <img src = {require('./img/Nayeon.jpg')}/>
    </div>
  )
}

}


class SelectCard extends Component{
  constructor(props){
    super(props);
    let displaystatusnumber = new Array(this.props.cardprops.length);
    this.props.cardprops.map((props, index) => displaystatusnumber[index] = props.id);
    this.state = {number : 0, displaystatus : this.props.displaystatusprop, displaystatusid : displaystatusnumber}
    this.handleClick = this.handleClick.bind(this);
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.newnumber = this.newnumber.bind(this);
  }

componentWillMount(){
  this.newnumber(this.state.displaystatus, this.state.displaystatusid)
}

  handleClick(){
    let num = this.state.number
    let length = this.props.cardprops.length
    if(num<length-1){
  this.newnumber(this.state.displaystatus, this.state.displaystatusid)
    }
  }



  newnumber(displaystatus, displaystatusid){
    for(let i= 0; i<displaystatus.length; i++){
    if(displaystatus[i] === 1){
      let temp = [...displaystatus];
      temp[i] = 0;
      this.setState({number  : displaystatusid[i], displaystatus : temp});
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
      <p> 질문: {this.props.cardprops[this.state.number].question}</p>
      <button onClick = {this.yes }>Likey!</button>
      <button onClick = {this.no }>TT...</button><br/>
      <img src = {require('./img/Nayeon.jpg')}/>
      </div>
    )
  }
}







export default App;
