function formatQuery( query, data ){
  let match = query.match(/\(([^\(]*)\);?$/)
  let params = match[1].split(',').map(x=>x.trim())
  let response = []
  data.forEach( reg => {
    let innerCount = 0
    let args=[]
    for(let i=0; i<params.length; i++){
      if(params[i]=='?'){
        args.push(reg[innerCount])
        innerCount++
      }
      else
        args.push(params[i])
    }
    response.push(`(${args.join(',')})`)
  })
  return query.replace(match[0],'')+response.join(',')
}
module.exports = formatQuery
