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