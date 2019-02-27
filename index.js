function formatBatch( query, data ){
  let match = query.match(/\(([^\(]*)\);?$/)
  let params = match[1].split(',').map(x=>x.trim())
  let response = []
  data.forEach( reg => {
    let innerCount = 0
    let args=[]
    for(let i=0; i<params.length; i++){
      if(params[i]=='?'){
        args.push(typeof reg[innerCount] == 'string'? `'${reg[innerCount]}'`: reg[innerCount])
        innerCount++
      }
      else
        args.push(params[i])
    }
    response.push(`(${args.join(',')})`)
  })
  return query.replace(match[0],'')+response.join(',')
}

function formatQuery( query, data ){
  let batches = data.reduce( (acc, cur, ind, src) => {
    let fit = 0
    acc.forEach( batch => {
      if(batch.length<maxRows){
        batch.push(cur)
        fit = 1
      }
    })
    if(!fit)
      acc.push([cur])
    return acc
  },[[]])
  let queries = batches.map( batch => formatBatch( query, batch ))
  let finalQuery = queries.join(';')
  return finalQuery
}
module.exports = formatQuery
