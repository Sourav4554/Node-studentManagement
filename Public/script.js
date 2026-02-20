const form = document.querySelector("#form");
const studentDetails = [];
const Studentname = document.querySelector("#name");
const age = document.querySelector("#age");
const adress = document.querySelector("#address");
const gridContainer = document.querySelector(".grid-container");

//fetch Data from Server
const fetchDataFromServer = async () => {
  try {
    const response = await fetch("http://localhost:8080/students");
    const data = await response.json();
     displayData(data);
  } catch (error) {
    console.log(error.message);
  }
};
//function for update task
const updateData = (index, item) => {
  const div = gridContainer.children[index];
  const inputs = {};
  div.innerHTML = "";
  const saveButton = document.createElement("button");
  saveButton.classList.add("edit-btn");
  saveButton.textContent = "Save";
  Object.entries(item).forEach(([key, value]) => {
    const input = document.createElement("input");
    input.type = key === "age" ? "number" : "text";
    input.placeholder = `Enter ${key}...`;
    input.value = value;
    inputs[key] = input;
    div.append(input, saveButton);
  });
  saveButton.addEventListener("click", () => {
    Object.entries(inputs).forEach(([key, input]) => {
      studentDetails[index][key] = input.value;
    });

    displayData(studentDetails);
  });
};
//function for delete data
const deleteData = async (_id) => {

try {
  console.log("trigger")
  //console.log(id)
  const response = await fetch(`http://localhost:8080/delete`, {
    method: "DELETE",
    headers:{
    'Content-type':'application/json'
    },
    body: JSON.stringify({_id}),
  });
  console.log(response)
if(response){
window.location.reload()
 }
  
} catch (error) {
  console.log(error);
}


};

//function for display data
const displayData = (studentDetails) => {
 // console.log(studentDetails)
  gridContainer.innerHTML = "";
  studentDetails.forEach((item) => {
   // console.log(item)
    //grid
    const grid = document.createElement("div");
    grid.classList.add("grid");
    Object.entries(item).forEach(([key, value]) => {
      const p = document.createElement("p");
      if (key === "_id") {
        return;
      }
      p.textContent = `${key} : ${value}`;
      grid.appendChild(p);
    });

    //button-wrapper
    const wrapperdiv = document.createElement("div");
    wrapperdiv.classList.add("wrapper");
    grid.appendChild(wrapperdiv);
    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
   
      deleteData(item._id);
    });
    //edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      updateData(index);
    });
    wrapperdiv.append(deleteBtn, editBtn);
    gridContainer.appendChild(grid);
  });
};

const getData = async (e) => {
  e.preventDefault();

  if (Studentname.value !== "" && age.value !== "" && adress.value !== "") {
    const student = {
      name: Studentname.value,
      age: Number(age.value),
      address: adress.value,
    };

    try {
      const response = await fetch("http://localhost:8080/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      form.reset();
       await fetchDataFromServer();
     
    } catch (error) {
      console.log(error.message);
    }
  } else {
    alert("All fields required");
  }
};

fetchDataFromServer();
form.addEventListener("submit", getData);
