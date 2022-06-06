import * as http from 'http'

class RequestBuilder {
  constructor() {
  }

  setHostAndPort (host, port) {
    this.host = host
    this.port = port
    return this
  }

  setPath (path) {
    this.path = path
    return this
  }

  setMethod(method, postObject){
    this.method = method
    if(method === 'POST')
      this.postData = JSON.stringify(postObject)
    return this
  }

  setHeaders(type, length){
    this.type = type
    this.length = length
    return this
  }

  build() {
    this.options = {
      hostname: this.host,
      port: this.port,
      path: this.path,
      method: this.method,
      headers: {
        'Content-Type': this.type,
        'Content-Length': this.length
      }
    }
  }

  invoke() {
    return new Promise((resolve, reject)=>{
      const req = http.request(this.options, (res)=>{
        res.setEncoding('utf8')
        res.on('data', (chunk)=>{
          console.log(`Body: ${chunk}`)
        })
        res.on('end',()=>{
          console.log(`No more data`)
        })
      })
      req.on('error',(e)=>{
        console.log(`problem: ${e.message}`)
        reject()
      })
      if(this.method.toUpperCase() === 'POST')
        req.write(this.postData)
      req.end();
      resolve()
    })
  }
}

let httpRequest = new RequestBuilder()

httpRequest.setHostAndPort("www.naver.com",80)
  .setPath('/')
  .setMethod('GET')
  .setHeaders(null,null)
  .build()

httpRequest.invoke()
  .then(res=>console.log(`okay!: ${res}`))
  .catch(err=> console.log(`not okay: ${err}`))
