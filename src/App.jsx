import React, { useState, useEffect } from 'react'
import './App.css'
import Pregame from './Components/Pregame.jsx'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';
import Question from './Components/Question'


function App() {
///////////// state que guarda preguntas, respuestas y respuestas seleccionadas por el jugador
  const [trivia,setTrivia] = useState([]);
    //////// estado que dice si empezo el juego
  const[gameStarted,setGameStarted] = useState(false)
  const[gameEnded, setGameEnded] = useState(false)
  const[gameScore,setGameScore] = useState(null)

  const[triviaConfig,setTriviaConfig]= useState({
    numberOfQuestions: 5,
    category:"",
    difficulty:"",
    type: ""
  })

  function triviaSetup(event){
    const {name, value} = event.target
    if(name=== "numberOfQuestions"){
      if (value < 5 || value > 50) {
        alert("Please enter a number between 5 and 50.");
        return
      }
    }
setTriviaConfig(oldTriviaConfig=>({
  ...oldTriviaConfig,
  [name]: value
}))
  }
// recibe las respuestas seleccionadas por el usuario y los guarda en state de trivia
function handleChange(event){
  const {name,value} = event.target
  const updatedTrivia = trivia.map(item=>{
    if(item.id === name){
    return{
    ...item,
    answer: value
  }
}else{
  return item
}
}
    )
    setTrivia(updatedTrivia)
}
// toma los datos desde la API luego los randomiza y lo guarda todo en trivia 
function restartGame(){
  fetchData();
  setGameEnded(false);
  setGameScore(0);
  setGameStarted(false);
}
function fetchData(){
  const{numberOfQuestions,category,difficulty,type} = triviaConfig
  fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}${category}${difficulty}${type}`)
  .then(response => response.json())
  // .then(data =>  setTrivia(data.results)) funciona perfecto
  .then(data => setTrivia(()=>{
    ///takes requested data and maps it into state to add an ID generated dynamically with nanoID
    const newTrivia = data.results.map(item=> {
      return{
        ...item, 
        id:nanoid(),
        answer: "",
        options: shuffle([...item.incorrect_answers,item.correct_answer])
          }
    })
    return newTrivia
  })
  
  )
}

function shuffle(array){
  for (let i = array.length-1; i > 0 ; i--){
    //Se elige uno al azar. de los que quedan
    let j =  Math.floor(Math.random() * (i+1));
    //se pone el recien elegido al principio del array ya establecido
    [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

/////////////////////////////finaliza el juego y revisa resultados
function countAnswers(){
  setGameEnded(true)
  let score = 0
    for(let i = 0; i < trivia.length; i++){
      if(trivia[i].answer === decode(trivia[i].correct_answer)){
        score = score+1
      }
    }
    setGameScore(score)
  }

const questionItems = trivia.map(item=>
  <Question
  key = {item.id}
  question = {item.question}
  options = {item.options}
  selectedAnswer = {item.answer}
  correctAnswer = {item.correct_answer}
  handleChange ={handleChange}
  checkingResults= {gameEnded}
  id = {item.id}
  />)
  

  return (
    <main>
{gameStarted?<div className='game'>
  {questionItems}
  {gameEnded&&<p>Score: {gameScore}/{trivia.length}</p>}
  {gameEnded?<button 
className="Btn"
disabled = {!trivia.every(element=> element.answer != "")}
onClick ={restartGame}
>Play Again!</button>:
<button 
className="Btn"
disabled = {!trivia.every(element=> element.answer != "")}
onClick ={countAnswers}
>Check Answers</button>}
  </div>:<Pregame handleClick = {()=>{
    fetchData()
    setGameStarted(true)}
    } triviaSettings = {triviaSetup}
    controlInput = {triviaConfig}
    />}
 </main>
  )

}

export default App
