import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch, Redirect } from 'react-router-dom'
import ResultPage from './component/Resultpage.js';
import {NewCard, DisplayDeck} from './component/Deckmaker.js';

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

class Deck extends Component{
  constructor(props){
    super(props);
    let initialcount = new Uint8Array(initialDeck.length);
    let initialdisplaystatus = new Array(initialDeck.length);
    let initialanswerstatus = new Array(initialDeck.length);
    let initialorder = new Array(initialDeck.length);
    for(let i = 0; i<initialorder.length; i++){
      initialorder[i] = i;
    }
    this.state = {
      card : initialDeck,
      displaystatus: testdis,
      answerstatus: initialanswerstatus,
      count : initialcount,
      order : initialorder,
      initialize : 0
    };
    this.registerNewCard=this.registerNewCard.bind(this);
    this.selectcard=this.selectcard.bind(this);
    this.initialize = this.initialize.bind(this);
    this.restart = this.restart.bind(this);
  }

  registerNewCard(param){
    this.setState((previousState => ({
      card : [...previousState.card , param],
      displaystatus : [...previousState.displaystatus , ''],
      answerstatus : [...previousState.answerstatus , ''],
      count : [...previousState.count, 0]
    })));
  }

initialize(){
  let initialanswerstatus = new Array(this.state.card.length);
  alert("참여해 주셔서 감사합니다.");
  this.setState({initialize : 1, answerstatus : initialanswerstatus })
}

restart(){
  this.setState({initialize : 0})
}

  selectcard(yesorno, num){
    let count = this.state.count;
    let answerstatus = this.state.answerstatus;
    count[num] += yesorno;
    answerstatus[num] = yesorno;
  }

  render(){
    console.log(this.state.order[10])
    return(
      <Switch>
      <Route exact path = "/" render = {(props) => <InitialPage restartPF = {this.restart}/>}/>
      <Route path = "/selectcard" render = {(props) => (this.state.initialize?
        (<Redirect exact to = '/'/>):(
        <SelectCard cardprops = {this.state.card} select = {this.selectcard} displaystatusprop = {this.state.displaystatus} initializePF = {this.initialize}
        />))}/>
      <Route path = "/newcard" render = {(props) => (<div>
        <NewCard regNewCard = {this.registerNewCard} leng = {this.state.card.length}/>
        <DisplayDeck cardPS = {this.state.card}/>
      </div>)
    }/>
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
    <Link to = '/selectcard'><button onClick = {this.props.restartPF}> 설문조사시작! </button></Link>
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
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.newnumber = this.newnumber.bind(this);
  }

componentWillMount(){
  this.newnumber(this.state.displaystatus, this.state.displaystatusid)
}

newnumber(displaystatus, displaystatusid){
    var initializetoken =0;
    for(let i= 0; i<displaystatus.length; i++){
    if(displaystatus[i] === 1){
      let temp = [...displaystatus];
      temp[i] = 0;
      initializetoken = 1;
      this.setState({number  : displaystatusid[i], displaystatus : temp});
      break;
    }
    }
    if(initializetoken == 0){
      this.props.initializePF();
    }
  }

  yes(){
    this.props.select(1, this.state.number);
    this.newnumber(this.state.displaystatus, this.state.displaystatusid);
  }

  no(){
    this.props.select(0, this.state.number);
    this.newnumber(this.state.displaystatus, this.state.displaystatusid)
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
