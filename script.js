
function openFeatures() {
let allelem = document.querySelectorAll('.elem')
let allelempage =document.querySelectorAll('.fullelem') 
let allfullelembackbtn=document.querySelectorAll('.fullelem .back')

allelem.forEach(function(elem){
    elem.addEventListener('click', function(){
        allelempage[elem.id].style.display = 'block'
    })
    
})

allfullelembackbtn.forEach(function(back){
    back.addEventListener('click', function(){ 
        allelempage[back.id].style.display='none'
    })
})
}

openFeatures()

let form =document.querySelector('.addTask form')
let taskInput =document.querySelector('.addTask form #task-input')
let taskDetailsInput =document.querySelector('.addTask form textarea')
let taskChecked =document.querySelector('.addTask form #check')

let currentTask = [
    {
        task:"Mandir jao",
        details:"Durga Maa",
        imp:true
    },
    {
        task:"Recording kro",
        details:"Cohot ki",
        imp:true
    },
    {
        task:"Study kro",
        details:"College me",
        imp:false
    }
]

function renderTask(){

    let allTask=document.querySelector('.allTask')
   let sum = ''
currentTask.forEach(function(elem){
    
    sum = sum +  `  <div class="task">
              <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
            <button>Marked As Completed</button>
          </div>`
    
})

allTask.innerHTML=sum

}

renderTask()

form.addEventListener('submit', function(e){
    e.preventDefault()
    // console.log(taskInput.value);
    // console.log(taskDetailsInput.value);
    // console.log(taskChecked.checked);
    console.log(currentTask);
    
})


