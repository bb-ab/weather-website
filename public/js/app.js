console.log('Client side javascript file has been loaded!')

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//add event listener
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('Testing!')
    const location=search.value //grab the value of input field
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
        
    })
})
    
})
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{

//         console.log(data)
//     })
// })

