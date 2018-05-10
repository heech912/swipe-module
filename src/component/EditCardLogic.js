import React, { Component } from 'react';
import '../App.css';

class EditCardLogic extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(<p class='background'   >
      <p> 지금 편집중인 카드:</p><br/>
      </p>
    )
  }
}

export default EditCardLogic;
