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
  try {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();

    motivationQuoteContent.innerHTML = data.content;
    motivationAuthor.innerHTML = data.author;

  } catch (error) {
    console.log("Failed to load quote", error);
  }
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

function weatherFunctionlity(){
  var apiKey = '4d6b0a762e284affb4753016261901'
var city = 'Bhopal'

var header1Time = document.querySelector('.header1 h1')
var header1Date = document.querySelector('.header1 h3')
var header2Temp = document.querySelector('.header2 h2')
var header2Condition = document.querySelector('.header2 h4')
var precip = document.querySelector('.header2 .precip')
var humidity = document.querySelector('.header2 .humidity')
var wind = document.querySelector('.header2 .wind')





var data = null
async function WeatherAPICall() {
  var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
   data = await response.json()

   header2Temp.innerHTML =`${data.current.temp_c}°C`
   header2Condition.innerHTML = `${data.current.condition.text}`
   wind.innerHTML = `Wind: ${data.current.wind_kph} km/h `
   humidity.innerHTML = `Humidity: ${data.current.humidity}%`
   precip.innerHTML = `Heat Index: ${data.current.heatindex_c}%`

  
}

WeatherAPICall()

function timeDate(){
  const totalDaysofWeek = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Saturday']
  const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  
   var date = new Date();
  var dayOfWeek = totalDaysofWeek[date.getDay()];
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var tarik = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();



   header1Date.innerHTML = `${tarik} ${month}, ${year}`

   if(hours>12){
          header1Time.innerHTML =`${dayOfWeek},${String(hours-12).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} PM `
   }
    else{
          header1Time.innerHTML =`${dayOfWeek},${String(hours).padStart('2','0')}:${String(minutes).padStart('2','0')}:${String(seconds).padStart('2','0')} AM `

      }

}

setInterval(()=> {
timeDate()
})
}
weatherFunctionlity()

function changeTheme() {

    var theme = document.querySelector('.theme')
    var rootElement = document.documentElement

    var flag = 0
    theme.addEventListener('click', function () {

        if (flag == 0) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#222831')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--pri', '#F1EFEC')
            rootElement.style.setProperty('--sec', '#030303')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--pri', '#F8F4E1')
            rootElement.style.setProperty('--sec', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }

    })


}

changeTheme()