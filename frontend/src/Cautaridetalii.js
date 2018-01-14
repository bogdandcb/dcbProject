import React, {Component } from 'react'

class Cautaridetalii extends Component{
    constructor(props){
        super(props)
        this.state={
        isEditing: false,
            cautariTitlu:this.props.cautari_recente.titlu_cautari,
            cautariContinut: this.props.cautari_recente.continut_cautari,
            cautariLink: this.props.cautari_recente.link, 
            usrId:this.props.cautari_recente.userId
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
                    <div class="card border-success mb-3" styles="max-width: 20rem;">
                    <div class="card-body">
                       
                       <p class="card-text"><font size="4" color="white"> Titlu:  {this.props.cautari_recente.titlu_cautari}</font></p>
                        <p class="card-text"><font size="4" color="white">Informatii: {this.props.cautari_recente.continut_cautari}</font></p>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <a class="card-text"><font size="4" color="white">Link: </font></a><a  href=" "><font size="4" color="blue">{this.props.cautari_recente.link}</font></a>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        
                    <button type="button" class="btn btn-outline-success" value="edit" onClick= {() => this.setState({isEditing: true})} > Edit </button>
                    <button type="button" class="btn btn-outline-danger" value="delete" onClick={() => this.props.onDelete(this.props.cautari_recente.id)}>Delete </button>
                   </div>
                    </div >
                    </div>
                )
}   
        else{
            return (
                <div>
                <input type="text" name="cautariTitlu" onChange={this.handleInputChange} value={this.state.cautariTitlu}/>
                <input type="text" name="cautariContinut" onChange={this.handleInputChange} value={this.state.cautariContinut}/>
                <input type="text" name="cautariLink" onChange={this.handleInputChange} value={this.state.cautariLink}/> 
                <button type="button" class="btn btn-outline-warning" value="cancel" onClick={()=>this.setState({isEditing: false})}>Cancel</button>
                <button type="button" class="btn btn-outline-info" value="save" onClick={() => this.props.onSave(this.props.cautari_recente.id, {titlu_cautari: this.state.cautariTitlu, continut_cautari: this.state.cautariContinut, link: this.state.cautariLink})}>Save</button>
                </div>
                )
        }
    }
}
export default Cautaridetalii