import React, { Component } from 'react'

class Cautaridetaliiform extends Component {
 constructor(props){
        super(props)
        this.state={
            cautariTitlu: '',
            cautariContinut: '',
            cautariLink: '',
            usrId:' ',
        }
        
        this.handleInputChange =(event)=>{
        this.setState({
            [event.target.name] : event.target.value 
        })
    }
 }
  render() {
    return (
      <div >
       <form>
       <div class="card border-danger mb-3" styles="max-width: 20rem;">
       <div class="card-body text-danger">
       <h4 class="card-title">Adauga detalii:</h4>
            <p class="card-text" align="center"><font size="4" color="white">Titlu ID: &emsp;<input type="text" size="35"onChange={this.handleInputChange} name="usrId"/></font></p>
            <p class="card-text" align="center"><font size="4" color="white">Titlu: &emsp; <input type="text" size="36" onChange={this.handleInputChange} name="cautariTitlu" /></font></p>
            <p class="card-text" align="center"><font size="4" color="white">Continut : <input type="text" size="34" onChange={this.handleInputChange} name="cautariContinut" /></font></p>
            &emsp;&emsp;<a class="card-text" align="left"><font size="4" color="white">&emsp;&emsp;&emsp;Link: &emsp; <input type="text"  size="35" onChange={this.handleInputChange} name="cautariLink" /></font></a>
            &emsp;
            
            <button type="button" class="btn btn-primary" 
            value="Add" onClick={() => this.props.onAdd({userId:this.state.usrId
            , titlu_cautari : this.state.cautariTitlu,continut_cautari : this.state.cautariContinut,link : this.state.cautariLink})}>Add </button>
            </div>
            </div>
            </form>
       </div>
    );
  }
}

export default Cautaridetaliiform
