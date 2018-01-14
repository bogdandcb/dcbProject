import React, {Component } from 'react'

class Cautari extends Component{
    constructor(props){
        super(props)
        this.state={isEditing: false,
        cautariCategorie :this.props.user.categorie,
        cautariNume:this.props.user.nume_cautare
        }
         this.handleInputChange =(event)=>{
        this.setState({
            [event.target.name] : event.target.value 
        })
    }
}
    componentWillReceiveProps(nextProps){
        this.setState({
            isEditing:false
        })
    }
        render(){
            if(!this.state.isEditing){
             return( 
                    <div>
                    
                        <a class="text-success">Categorie:</a> {this.props.user.categorie}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <a class="text-primary">Cautare:</a> {this.props.user.nume_cautare}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                    <button type="button" class="btn btn-outline-success" onClick= {() => this.setState({isEditing: true})}>Edit </button>
                   <button type="button" class="btn btn-outline-danger" value="delete" onClick={() => this.props.onDelete(this.props.user.id)}>Delete </button>
                    <button type="button" class="btn btn-outline-primary" value="details" onClick={()=>this.props.onSelect(this.props.user.id)}>More </button>
                
                    </div >
                )
}   
        else{
            return (
                <div>
                <input type="text" name="cautariCategorie" onChange={this.handleInputChange} value={this.state.cautariCategorie}/>
                <input type="text" name="cautariNume" onChange={this.handleInputChange} value={this.state.cautariNume}/> 
                <button type="button" class="btn btn-outline-warning" value="cancel" onClick={()=>this.setState({isEditing: false})}>Cancel </button>
                <button type="button" class="btn btn-outline-info" value="save" onClick={() => this.props.onSave(this.props.user.id, {categorie : this.state.cautariCategorie, nume_cautare: this.state.cautariNume})}>Save</button>
                </div>
                )
        }
            }
      
    }
export default Cautari