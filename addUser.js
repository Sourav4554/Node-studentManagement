const path=require('path')
const fs=require('fs').promises

async function addUser(body) {
    if (Object.entries(body).length === 0) {
      console.log("something wrong no data");
      return;
    }
  
    const jsonFile = path.join(__dirname, "Public", "user.json");
    
    let students = [];
  
    try {
      // Step 1: Read existing data
      const data = await fs.readFile(jsonFile, "utf-8");
      students = JSON.parse(data);
    } catch (err) {
     
      if (err.code !== "ENOENT") {
        console.log(err.message);
        return;
      }
    }
  
    // Step 2: Push new data
    const newStudent = {
        id: crypto.randomUUID(),
        ...body
      };
    
      students.push(newStudent);
  
    try {
      // Step 3: Write back
      await fs.writeFile(jsonFile, JSON.stringify(students, null, 2));
      console.log("User added successfully ✅");
    } catch (error) {
      console.log(error.message);
    }
  }
  
module.exports={addUser}