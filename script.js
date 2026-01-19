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

 
  
  var allTask = document.querySelector(".allTask");
  var sum = "";
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


function dailyPlanner() {
  
var dayPlanner = document.querySelector('.day-planner')
var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

var hours =Array.from({length:18},(_,idx)=>`${6+idx}:00 - ${7+idx}:00`)

var wholeDaySum = ''
hours.forEach(function(elem,idx){

  var savedData = dayPlanData[idx] || ''
  wholeDaySum = wholeDaySum +  ` <div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value=${savedData}>
          </div>`

})



dayPlanner.innerHTML = wholeDaySum

var dayPlannerInput = document.querySelectorAll('.day-planner input')

dayPlannerInput.forEach(function(elem){
  elem.addEventListener('input', function(){
     dayPlanData[elem.id] = elem.value
    
     localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
  })
})
}

dailyPlanner()

function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response = await fetch('https://api.quotable.dev/random')
        let data = await response.json()

        motivationQuoteContent.innerHTML = data.content
        motivationAuthor.innerHTML = data.author
    }

    fetchQuote()
}

motivationalQuote()


function pomodoroTimer(){
  let timer = document.querySelector('.pomo-timer h1')
let startbtn = document.querySelector('.pomo-timer .start-timer')
let pausetbtn = document.querySelector('.pomo-timer .pause-timer')
let resetbtn = document.querySelector('.pomo-timer .reset-timer')
let session=document.querySelector('.pomodoro-fullpage .session')
let isWorkSession = true

let timerInterval = null
let totalSeconds = 25*60
function upDateTimer(){
  let minutes =Math.floor(totalSeconds/60)
  let seconds = totalSeconds%60

  timer.innerHTML=`${ String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')}`
}


function startTimer(){

  clearInterval(timerInterval)

if(isWorkSession){
  
   timerInterval= setInterval(function(){
    if(totalSeconds >0){
      totalSeconds--
      upDateTimer()
    }else{
      isWorkSession = false
      clearInterval(timerInterval)
      timer.innerHTML = '05:00'
      session.innerHTML = 'Take a Break'
      session.style.backgroundColor = 'var(--tri3)'
        totalSeconds = 5*60
    }
  },1000)
}else{

   timerInterval= setInterval(function(){
    if(totalSeconds >0){
      totalSeconds--
      upDateTimer()
    }else{
      isWorkSession = false
      clearInterval(timerInterval)
      timer.innerHTML = '25:00'
        session.innerHTML = 'Work Session'
      session.style.backgroundColor = ''
      totalSeconds = 25*60


    }
  },1000)
}
}

function pauseTimer(){
  clearInterval(timerInterval)
}

function resetTimer(){
  totalSeconds = 25*60
  clearInterval(timerInterval)
  upDateTimer()
}
startbtn.addEventListener('click', startTimer)
pausetbtn.addEventListener('click',pauseTimer)
resetbtn.addEventListener('click',resetTimer)

}

pomodoroTimer()

var apiKey = '4d6b0a762e284affb4753016261901'
var city = 'Bhopal'

async function WeatherAPICall() {
  var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)

  var data = await response.json()
  console.log(data.current.temp_c)
}

WeatherAPICall()
