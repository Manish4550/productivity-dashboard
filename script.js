function openFeatures() {
  let allelem = document.querySelectorAll(".elem");
  let allelempage = document.querySelectorAll(".fullelem");
  let allfullelembackbtn = document.querySelectorAll(".fullelem .back");

  allelem.forEach(function (elem) {
    elem.addEventListener("click", function () {
      allelempage[elem.id].style.display = "block";
    });
  });

  allfullelembackbtn.forEach(function (back) {
    back.addEventListener("click", function () {
      allelempage[back.id].style.display = "none";
    });
  });
}

openFeatures();

function todolist(){
  var currentTask = [];
if(localStorage.getItem('currentTask')){
    currentTask =JSON.parse(localStorage.getItem('currentTask'))
}else{
    console.log('Task List is Empty');
    
}

function renderTask() {

 
  
  let allTask = document.querySelector(".allTask");
  let sum = "";
  currentTask.forEach(function (elem,idx) {
    sum =
      sum +
      `  <div class="task">
        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button id=${idx}>Marked As Completed</button>
        </div>`;
  });

  allTask.innerHTML = sum;

   localStorage.setItem('currentTask',JSON.stringify(currentTask))
   
   // Attach event listeners to newly created buttons
   let markedCompletedBtn = document.querySelectorAll('.task button')
   markedCompletedBtn.forEach(function(btn){
     btn.addEventListener('click', function(){
       currentTask.splice(btn.id, 1)
       renderTask()
     })
   })
}

renderTask();

let form = document.querySelector(".addTask form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskChecked = document.querySelector(".addTask form #check");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log(taskInput.value);
  // console.log(taskDetailsInput.value);
  // console.log(taskChecked.checked);
  currentTask.push({
    task: taskInput.value,
    details: taskDetailsInput.value,
    imp: taskChecked.checked,
  });
  renderTask();
  
  taskInput.value=''
  taskDetailsInput.value=''
  taskChecked.checked=false

  
});

}

todolist()