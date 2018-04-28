import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom'

class ResultPage extends Component{
  constructor(props){
  super(props);
}
render(){
    let cardinfo = this.props.cardprops;
    this.props.selecteddata.map((props,index) => cardinfo[index].count = props);
  return(
    <div>
    {cardinfo.map((props) => <ResultCard info = {props}/>)}
    <Link to = '/'><button>메인화면으로</button></Link>
</div>
)}
}

class ResultCard extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<ul>
<li>{this.props.info.question}</li>
<li>{this.props.info.count}</li>
</ul>
    )
  }
}

export default ResultPage;
