const request= require('request-promise')
const cheerio=require('cheerio')
const urlencode=require('urlencode')


function search(terms){
    return new Promise((resolve,reject)=>{
        let searchUrl =`https://www.bing.com/search?q=${
            urlencode(terms)}`
            request.get(searchUrl)
            .then((content)=>{
                let $ = cheerio.load(content)
                let links = $('.b_algo h2 a').toArray()
                let results = links.map((e)=>{
                    return {
                        link : $(e).attr('href'),
                        text : $(e).html().replace(/<(?:.|\n)*?>/gm,'')
                    }
                })
                resolve(results)
            })
            .catch((err)=>reject(err))
        
    })
    
}
//search('test')
//.then((restults) => console.warn(results))
//.catch((err) => console.warn(err))
module.exports= search