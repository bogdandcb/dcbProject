import axios from 'axios'

const SERVER='https://manager-cautari-bing-reprez.c9users.io'


class CautariStocate{
    constructor(ee){
        this.emitter=ee
        this.content=[]
        this.selected={}
        
    }
    getAll(){axios(SERVER + '/users')
            .then((response)=>{
            this.content=response.data
            this.emitter.emit('PARKING LIST LOADING..')
        })
        .catch((error)=>console.warn(error))
    }
    getOne(id){
         axios(SERVER + '/users/' + id)
         .then((response)=>{
             this.selected=response.data
             this.emitter.emit('Get_single_parking')
         })
         .catch((error)=>console.warn(error))
    }
    
     getOneBing(terms){
         axios(SERVER + '/search/' + terms)
         .then((response)=>{
             this.selected=response.data
             this.emitter.emit('Get_Bing')
         })
         .catch((error)=>console.warn(error))
    }
    
    addOne(user){
        axios({
        method: 'post',
        url: SERVER + '/users',
        headers: {'Content-Type' : 'application/json'},
        data : user
    })
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
     createOne(user){
        
        axios.post(SERVER + '/users/',user)
        .then((response) => {
            this.content=response.data
            this.emitter.emit("PARKING LOADING")
        })
        .then(() => this.getAll())
        .catch((error) => console.warn(error))
    }
   
    deleteOne(id){
        axios.delete(SERVER + '/users/' + id)
        .then(()=>this.getAll())
        .catch((error)=>console.warn(error))
    }
     saveOne(id,user){
        axios.put(SERVER + '/users/' + id,user)
       .then(() => this.getAll())
       .catch((error) => console.warn(error))
    }
    
}
export default CautariStocate