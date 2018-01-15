import React, {Component } from 'react'
import {EventEmitter} from 'fbemitter'
import CautariStocate from './Cautari_recente/CautariStocate' 
import Cautari from './Cautari'
import CautareForm from './CautareForm'
import DetaliiCautare from './DetaliiCautare'


const emitter= new EventEmitter()
const store= new CautariStocate(emitter)
let addCautari=(user)=>{
    store.createOne(user)
}
let deleteCautare=(id)=>{
    store.deleteOne(id)
}
let saveCautare=(id,user)=>{
    store.saveOne(id,user)
}

class CautariList extends Component{
    constructor(props){
        super(props)
        this.state={
            users : [],
            selected:{},
            detailsPt: -1,
            terms:''
            }
            
            this.selectBing=(terms)=>{
                store.getOneBing(terms)
                emitter.addListener('Get_Bing',()=>{
                    this.setState({
                        selected : store.selected,
                        detailsPt :terms 
                    })
                })
                //console.log(this.state.selected)
            }
            this.selectCautari=(id)=>{
                store.getOne(id)
                emitter.addListener('Get_cautari',()=>{
                    this.setState({
                        selected : store.selected,
                        detailsPt : id
                    })
                })
            }
            this.unselect=()=>{
                this.setState({
                    detailsPt: -1
                })
            }
            this.handlerBing = this.handlerBing.bind(this);
               } 


    componentDidMount(){
        store.getAll()
        emitter.addListener('Cautari Loading', () => {
            this.setState({
                users : store.content
            })
        })
    }
    
    handlerBing(terms){
        this.setState({
            terms:terms
        })
    }

   
    render() {
        
            if(this.state.detailsPt=== -1){
            return (
            <div>
            <div>
            <CautareForm onAdd={addCautari} onSearch={this.handlerBing}/>
            
            <br></br>
            
            <br></br>
            </div>
            
             <table class="table table-hover">
            <thead>
             <tr>
             <th scope="col"><h3>Lista Cautari:</h3></th>
              
                </tr>
                
                </thead>
             <tbody>
             <tr class="table-active"> 
           
                 </tr>
                {this.state.users.map((e)=>
              <tr class="table-active">     
            
                    <th scope="col"><h5><Cautari user={e} key={e.id} onDelete={deleteCautare} onSave={saveCautare} onSelect={this.selectCautari} /></h5></th>
              </tr>       
            )}
            </tbody>
                </table> 
            
            </div>
            
            
            
            )                
     }
     else{
         return(<div><DetaliiCautare user={this.state.selected} onUnselect={this.unselect}/>
         </div>)
     }

    }
}
export default CautariList
