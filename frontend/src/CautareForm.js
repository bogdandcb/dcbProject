import React, { Component } from 'react'

class CautareForm extends Component {
 constructor(props){
        super(props)
        this.state={
            cautariCategorie: '', 
            cautariNume: '', 
            cautariBing: ''
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
       Bing Search  : <input type="text"  size="100" onChange={this.handleInputChange} name="cautariBing" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <button type="submit" class="btn btn-primary" value="Add" >Search </button>
          <br></br>
          <br></br>
          <br></br>
      <br></br>
       <form>
                        
            Categorie  : <input type="text" onChange={this.handleInputChange} name="cautariCategorie" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            
            Cauta : <input type="text" onChange={this.handleInputChange} name="cautariNume" />&nbsp;&nbsp;
             
            <button type="submit" class="btn btn-primary" value="Add" onClick={() => this.props.onAdd({categorie : this.state.cautariCategorie , nume_cautare : this.state.cautariNume})}>Add </button>
            </form>
       </div>
    );
  }
}

export default CautareForm
