import axios from 'axios'

const SERVER='https://manager-cautari-bing-reprez.c9users.io'


class ContinutStocat{
    constructor(ee){
        this.emitter=ee
        this.content=[]
        this.selected={}
        
    }
    getAll(userId){
        axios(SERVER + '/users/' + userId + '/cautari_recentes')
            .then((response)=>
            {
            this.content=response.data
            this.emitter.emit('CAUTARI LOADING..')
        })
        .catch((error)=>console.warn(error))
    }
   
    createOne(userId,cautari_recente){
        axios.post(SERVER + '/users/'+ userId + '/cautari_recentes', cautari_recente)
        .then(() => this.getAll(userId))
        .catch((error) => console.warn(error))
    }
   
   saveOne(userId,cautari_recenteId,cautari_recente){
        axios.put(SERVER + '/users/' + userId + '/cautari_recentes/'+ cautari_recenteId,cautari_recente)
       .then(() => this.getAll(userId))
       .catch((error) => console.warn(error))
    }
    
    deleteOne(userId,cautari_recenteId){
        axios.delete(SERVER + '/users/'  + userId + '/cautari_recentes/' + cautari_recenteId)
        .then(()=>this.getAll(userId))
        .catch((error)=>console.warn(error))
    }
     
    
}
export default ContinutStocat
