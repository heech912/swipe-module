import React, { Component } from 'react';

class CurrentCard extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(<div>
      <p> '지금 편집중인 카드:'</p><br/>
      </div>
    )
  }
}

export default CurrentCard;
