import React, { Component } from 'react'
import './App.css'
import CautariList from './CautariList'
import img from './search.png'

class App extends Component {
  // eslint-disable-next-line
constructor(props){
  super(props)
  
}
  render() {
    return (
      <div className="App">
        <header className="App-header">
       
        <img src={img}  width="100" height="100"/>
          <h1 className="App-title">Manager de cautari</h1>
        </header>
        <br></br>
        <br></br>
        <br></br>
        <CautariList />
       </div>
    );
  }
}

export default App
