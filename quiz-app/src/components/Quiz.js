import React, { useState, useContext, useEffect } from "react";
import {QuizContext} from "../Helpers/Contexts";
import {Questions} from "../Helpers/QuestionBank";

export default function Quiz() {

const { score, setScore, setGameState} = useContext(QuizContext);

    const [currQuestion, setCurrQuestion] = useState(0);
    const [optionChosen, setOptionChosen] = useState("");
    const [correctAnswers, setCorrectAnswer] = useState(0);
    const [wrongAnswers, setWrongAnswer] = useState(0);
    const [attemptQuestions, setAttemptQuestion] = useState(0);


    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    var timer;
    useEffect(() =>{
        timer=setInterval(() => {
            setSeconds(seconds+1);
            if(seconds == 59){
                setMinutes(minutes+1);
                setSeconds(0);
            }
        },1000); 
        return() => clearInterval(timer);   
            
    });
    


    const nextQuestion = () => {
        if (Questions[currQuestion].answer == optionChosen){
            setScore(score+1);
            setCorrectAnswer(correctAnswers+1);
            console.log("total number of correct answer:",setCorrectAnswer);
        }
        else{
          setWrongAnswer(wrongAnswers+1);
        }
        setAttemptQuestion(attemptQuestions+1);
        setCurrQuestion(currQuestion+1);
          
        setSeconds(0);
        setMinutes(0);
    };

    const finishQuiz = () => {
        if (Questions[currQuestion].answer == optionChosen){
            setScore(score+1);
            setCorrectAnswer(correctAnswers+1);
        }
        else{
          setWrongAnswer(wrongAnswers+1);
        }  
        setGameState("endScreen");  
    
    

        

    };
    return(
    <div className="Quiz">
        <h3>{minutes<10?"0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</h3>
        <h1>{Questions[currQuestion].prompt}</h1>
        <div className="options">
            <button onClick={() => setOptionChosen("A")}> 
              {Questions[currQuestion].OptionA}
            </button>
            <button onClick={() => setOptionChosen("B")}>
              {Questions[currQuestion].OptionB}
            </button>
            <button onClick={() => setOptionChosen("C")}>
              {Questions[currQuestion].OptionC}
              </button>
            <button onClick={() => setOptionChosen("D")}> 
              {Questions[currQuestion].OptionD}
            </button> 

        </div>

        

         
        {currQuestion==Questions.length-1 ? (
          <button onClick ={finishQuiz}>Finish Quiz </button>
        ):(
        
          <button onClick={nextQuestion}> Next </button>  
          
          
          
    
        )}
        </div>
        
    );
    
}
