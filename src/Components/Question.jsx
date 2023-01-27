import {decode} from 'html-entities';
import { nanoid } from 'nanoid';
export default function  Question(props){


    const answerArray = props.options.map((item,index)=>{
           const optionID = item=== props.correctAnswer? "correct":"incorrect"

        return(
        <div className='radio'
         id = {(props.checkingResults||(props.checkingResults && item ===props.correctAnswer))? optionID: ""}
        key = {nanoid()}>
            <input type="radio"      
            onChange={props.handleChange}
            disabled = {props.checkingResults}
            value = {decode(item)}
            name = {props.id}
            id = {`${decode(item)}${props.id}`}
            checked = {decode(item)===props.selectedAnswer}
            />
            <label htmlFor={`${decode(item)}${props.id}`} >{decode(item)}</label> 
        </div>
        )
        })
        
return(
    <div className='question'>
        <h2 className='questionText'>{decode(props.question)}</h2>
        <div className='answers'>
        {answerArray}
        </div> 
    <hr />
    </div>
)
}