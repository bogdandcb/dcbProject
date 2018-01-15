import React, { Component } from 'react'
import {EventEmitter} from 'fbemitter'
import ContinutStocat from './Cautari_recente/ContinutStocat'
import Cautaridetalii  from  './Cautaridetalii'
import Cautaridetaliiform from './Cautaridetaliiform'

const emitter= new EventEmitter()
const store=new ContinutStocat(emitter)


class DetaliiCautare extends Component {
  
constructor(props){
  super(props)
  this.state={
      cautari_recentes: []
  }
  this.deleteCautare_recente=(cautari_recenteId) => {
      store.deleteOne(this.props.user.id,cautari_recenteId)
  }
  this.addCautari_recente=(cautari_recente) => {
      store.createOne(this.props.user.id,cautari_recente)
  }
  this.saveCautari_recente=(cautari_recenteId,cautari_recente) => {
      store.saveOne(this.props.user.id, cautari_recenteId, cautari_recente)
  }
}
 componentDidMount(){
   store.getAll(this.props.user.id) 
   emitter.addListener('CAUTARI LOADING..', () =>{
       this.setState ({
           cautari_recentes : store.content
       })
   })
}

  render() {
    return (
      <div >
        <a class="text-primary"><font size="7">Rezultate pentru:</font></a><a><font size="7" color="white"> {this.props.user.nume_cautare}</font></a>
        <br></br>
        <a class="text-primary"><font size="4">Titlu ID:</font></a><a><font size="4" color="white"> {this.props.user.id}</font></a>
        
        <div>
        <div>
        <h1></h1>
        <br></br>
        <br></br>
         <h5 >Detalii despre cautarea dumneavoastra:</h5>
        <br></br>
         {
             this.state.cautari_recentes.map((c) =>
             <Cautaridetalii cautari_recente={c} onDelete={this.deleteCautare_recente} onSave={this.saveCautari_recente} key={c.id}/>
             )
         }
         
        </div>
        <div>
        
        <Cautaridetaliiform onAdd={this.addCautari_recente} />
        <p align="left"> <button type="button" class="btn btn-danger" type="button" value="Back"  onClick= {() =>  this.props.onUnselect()}>Back To First Page</button>
        </p>
        </div>
        </div>
        
        </div>
    )
  }
}

export default DetaliiCautare
