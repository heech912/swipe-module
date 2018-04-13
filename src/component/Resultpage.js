import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link , Switch } from 'react-router-dom'

class ResultPage extends Component{
  constructor(props){
  super(props);
}
render(){
  return(
    <div>
    <p>asdf</p>

    <Link to = '/'><button>메인화면으로</button></Link>
</div>
)}
}

export default ResultPage;
