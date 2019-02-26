let query = "Do something with values (?,?,1,?,1,?)"
let data = [['a','b','c','d'],['d','e','f','g'],['h','i','j','k'],['l','m','n','o']]
let params = query.match(/\((.*)\);?$/)[1].split(',').map(x=>x.trim())
let response = []
data.forEach( registro => {
  let innerCount = 0
  let innerArgs=[]
  for(let i=0; i<params.length; i++){
    if(params[i]=='?'){
      innerArgs.push(registro[innerCount])
      innerCount++
    }
    else{
      innerArgs.push(params[i])
    }
  }

  registroStr = `(${innerArgs.join(',')})`
  response.push(registroStr)
})
response=response.join(',')
let fullQuery = query.replace(query.match(/\((.*)\);?$/)[0],'')+response
console.log(fullQuery)
