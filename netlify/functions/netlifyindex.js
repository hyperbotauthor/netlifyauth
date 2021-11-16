exports.handler = async function(event, context) {
  if(event.httpMethod === "POST"){
    const request = JSON.parse(event.body)
    if(request.password === process.env.PASSWORD){      
      const exports = Object.keys(process.env).filter(
        key => key.match(/_TOKEN$|_URI$/) && !key.match(/SESSION_TOKEN$/)
      ).map(key => `export ${key}=${process.env[key]}`).join("\n") + "\n"
      return {
        statusCode: 200,
        body: JSON.stringify({
          status: "ok",          
          exports: exports
        })
      }
    }else return {
      statusCode: 401,
      body: JSON.stringify({
        status: "unauthorized, wrong password"
      })
    }
  } else {
    return {
      statusCode: 200,
      body: "you should use a POST request"
    }
  }    
}
