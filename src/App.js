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
      order : [9,1,3,2,4,5,7,6,0,8],//위치는 순서, element는 card.id
      initialize : 0
    };
    this.registerNewCard=this.registerNewCard.bind(this);
    this.selectcard=this.selectcard.bind(this);
    this.initialize = this.initialize.bind(this);
    this.restart = this.restart.bind(this);
    this.changeorder = this.changeorder.bind(this);
  }

  registerNewCard(param){
    this.setState((previousState => ({
      card : [...previousState.card , param],
      displaystatus : [...previousState.displaystatus , ''],
      answerstatus : [...previousState.answerstatus , ''],
      count : [...previousState.count, 0],
      order : [...previousState.order, previousState.order.length]
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

changeorder(initialloc, finalloc){
  let temparr = [...this.state.order];
  let tempid = temparr[finalloc];
  temparr[finalloc] = temparr[initialloc];
  temparr[initialloc] = tempid;
  this.setState({order : temparr})
}

selectcard(yesorno, num){
    let count = this.state.count;
    let answerstatus = this.state.answerstatus;
    count[num] += yesorno;
    answerstatus[num] = yesorno;
  }

  render(){
    return(
      <Switch>
      <Route exact path = "/" render = {(props) => <InitialPage restartPF = {this.restart}/>}/>
      <Route path = "/selectcard" render = {(props) => (this.state.initialize?
        (<Redirect exact to = '/'/>):(
        <SelectCard
          cardPS = {this.state.card}
          select = {this.selectcard}
          displaystatusPS = {this.state.displaystatus}
          initializePF = {this.initialize}
          orderPS = {this.state.order}
        />))}/>
      <Route path = "/newcard" render = {(props) => (<div>
        <NewCard regNewCard = {this.registerNewCard} leng = {this.state.card.length}/>
        <DisplayDeck cardPS = {this.state.card} orderPS = {this.state.order} changeorderPF = {this.changeorder}/>
      </div>)
    }/>
      <Route path = "/result" render = {(props) =>
        <div>
        <ResultPage cardPS = {this.state.card} selecteddata = {this.state.count}/>
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
    this.state = {number : this.props.orderPS[0], displaystatus : this.props.displaystatusPS, order : this.props.orderPS}
    this.yes = this.yes.bind(this);
    this.no = this.no.bind(this);
    this.newnumber = this.newnumber.bind(this);
  }

componentWillMount(){
  this.newnumber(this.state.displaystatus, this.state.order)
}

newnumber(displaystatus, order){
    var initializetoken =0;
    for(let i= 0; i<order.length; i++){
    if(displaystatus[order[i]] === 1){
      let temp = [...displaystatus];
      temp[order[i]] = 0;
      initializetoken = 1;
      this.setState({number  : [order[i]], displaystatus : temp});
      break;
    }
    }
    if(initializetoken == 0){
      this.props.initializePF();
    }
  }

  yes(){
    this.props.select(1, this.state.number);
    this.newnumber(this.state.displaystatus, this.state.order);
  }

  no(){
    this.props.select(0, this.state.number);
    this.newnumber(this.state.displaystatus, this.state.order)
  }

  render(){
    return(
      <div>
      <p> [지금 카드] </p>
      <p> 질문: {this.props.cardPS[this.state.number].question}</p>
      <button onClick = {this.yes }>Likey!</button>
      <button onClick = {this.no }>TT...</button><br/>
      <img src = {require('./img/Nayeon.jpg')}/>
      </div>
    )
  }
}







export default App;
