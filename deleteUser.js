const fs = require("fs").promises;
const path = require("path");
const deleteUser = async (deleteId) => {
  if (!deleteId || deleteId === "") {
    throw new Error("delete id not found");
  }
  try {
    const jsonPath = path.join(__dirname, "Public", "user.json");
    const response = await fs.readFile(jsonPath, "utf-8");
    const studentDetails = JSON.parse(response);
    const dataAfterDelete = studentDetails.filter(
      (item) => item.id !== deleteId
    );
    await fs.writeFile(jsonPath, JSON.stringify(dataAfterDelete, null, 2));
    console.log("User deleted successfully ✅");
  } catch (error) {
   console.log(error.message)  
 }
 
};

module.exports = { deleteUser };
