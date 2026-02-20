const { MongoClient } = require("mongodb");
const url='mongodb://127.0.0.1:27017'
const db='StudentManagement'
const client=new MongoClient(url)
const dbConnection=async()=>{
    console.log('working')
try {
    await client.connect()
    console.log('mongodbconnected')
   return client.db(db)
  
} catch (error) {
    console.log(error.message)
}
}

module.exports={dbConnection}