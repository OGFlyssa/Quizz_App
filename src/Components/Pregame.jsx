import React, {useRef} from 'react'

export default function Pregame(props){
    return(
    <div className='pregame'>
    <h1 className="mainTitle">Super Quizz! <br />
    <span className="subtitle">Test your knowledge on different categories! </span>
    </h1>
    <div className='settings'>
    <label htmlFor="numberOfQuestions">
    Number of questions :
    </label>
      <input type="number" max = "50" min = "5" name="numberOfQuestions" onChange={props.triviaSettings} 
      value={props.controlInput.numberOfQuestions}/>
  <br />
    {/* start of categories */}
    <select name="category" id="category" onChange={props.triviaSettings} value={props.controlInput.category}>
      <option value="">Choose a category</option>
      <option value="&category=9">General Knowledge</option>
      <option value="&category=10">Entertainment: Books</option>
      <option value="&category=11">Entertainment: Film</option>
      <option value="&category=12">Entertainment: Music</option>
      <option value="&category=13">Entertainment: Musicals & Theatres</option>
      <option value="&category=14">Entertainment: Television</option>
      <option value="&category=15">Entertainment: Video Games</option>
      <option value="&category=16">Entertainment:Board Games</option>
      <option value="&category=31">Entertainment: Japanese Anime & Manga</option>
      <option value="&category=32">Entertainment: Cartoons and animations</option>
      <option value="&category=29">Entertainment: Comics</option>
      <option value="&category=17">Science and Nature</option>
      <option value="&category=18">Science: Computers</option>
      <option value="&category=19">Science: Mathematics</option>
      <option value="&category=30">Science: Gadgets</option>
      <option value="&category=20">Mythology</option>
      <option value="&category=21">Sports</option>
      <option value="&category=22">Geography</option>
      <option value="&category=23">History</option>
      <option value="&category=24">Politics</option>
      <option value="&category=25">Art</option>
      <option value="&category=26">Celebrities</option>
      <option value="&category=27">Animals</option>
      <option value="&category=28">Vehicles</option>
    </select> 
    <br />
    <label htmlFor="difficulty">Difficulty:
    </label> 
    <select name="difficulty" id="difficulty" onChange={props.triviaSettings} value={props.controlInput.cdifficulty}>
      <option value="">Mixed</option>
      <option value="&difficulty=easy">Easy</option>
      <option value="&difficulty=medium">Normal</option>
      <option value="&difficulty=hard">Hard</option>
    </select> <br />
    <div className="typeSelect" >
<p className='subtitle'>Question type</p>
  <input type="radio" name="type" id="mixedTypes" value="" onChange={props.triviaSettings} />
  <label htmlFor="mixedTypes" >Mixed</label>
  <input type="radio" name ="type" id="multiple" value="&type=multiple" onChange={props.triviaSettings}/>
    <label htmlFor="multiple">Multiple Choice</label>
  <input type="radio" name ="type" id="boolean" value="&type=boolean" onChange={props.triviaSettings} />
    <label htmlFor="boolean">True / False</label>

</div>
</div>
    <button className="Btn" onClick={props.handleClick}>Let's start!</button>
    </div> )
}