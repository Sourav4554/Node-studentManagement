const form = document.querySelector("#form");
const studentDetails = [];
const Studentname = document.querySelector("#name");
const age = document.querySelector("#age");
const adress = document.querySelector("#address");
const gridContainer = document.querySelector(".grid-container");


//fetch Data from Server
const fetchDataFromServer=async()=>{


}
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
const deleteData = (index, studentDetails) => {
  studentDetails.splice(index, 1);
  displayData(studentDetails);
};

//function for display data
const displayData = (studentDetails) => {
  gridContainer.innerHTML = "";
  studentDetails.forEach((item, index) => {
    //grid
    const grid = document.createElement("div");
    grid.classList.add("grid");
    Object.entries(item).forEach(([key, value]) => {
      const p = document.createElement("p");
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
      deleteData(index, studentDetails);
    });
    //edit button
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      updateData(index, item);
    });
    wrapperdiv.append(deleteBtn, editBtn);
    gridContainer.appendChild(grid);
  });
};

const getData = (e) => {
//  e.preventDefault();
  if (Studentname.value !== "" && age.value !== "" && adress.value !== "") {
   // const Data = new FormData(e.target);
   // const FormEntries = Object.fromEntries(Data);
   // studentDetails.push(FormEntries);
    form.reset();
    fetchDataFromServer();
    //displayData(studentDetails);
  } else {
    alert("all fields required");
  }
};

form.addEventListener("submit", getData);