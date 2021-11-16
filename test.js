const fetch = require("node-fetch")

async function test(){
  const response = await fetch(`https://netlifyauth.hyperbotauthor.repl.co/.netlify/functions/netlifyindex`, {
    method: "POST",
    body: JSON.stringify({password: "password"})
  })
  const blob = await response.json()
  if(blob.status === "ok"){    
    require('fs').writeFileSync("exports.sh", blob.exports)
    console.log("exports written")
  }else{
    console.log(blob.status)
  }  
}

test()