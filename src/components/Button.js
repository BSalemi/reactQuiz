import React from 'react';
import {getMessage} from '../data/messages.js'

function Button(props){
    const { 
        nextQuestion, 
        nextQuiz, 
        retakeQuiz, 
        questionsCorrect, 
        questionIndex, 
        firstQuiz, 
        questionsLength, 
        quizIndex, 
        quizAttempts, 
        isCorrect, 
        quizzesLength, 
        toggleVisibility 
     } = props;

      let buttons

      if (
        questionIndex >= questionsLength - 1 &&
        quizIndex < quizzesLength - 1
      ) {
        buttons = (
          <div>
            <button onClick={nextQuiz}>Next Quiz</button>
            <button onClick={retakeQuiz}>Retake</button>
          </div>
        );
      } else if (questionIndex >= questionsLength - 1) {
        buttons = (
          <div>
            <button onClick={retakeQuiz}>Retake</button>
            <button onClick={firstQuiz}>Back to First Quiz</button>
          </div>
        );
      }

     return(
         <div>
        <h4 className="answerResult">{isCorrect ? "Correct!" : "Incorrect..."}</h4> 
        {questionIndex < questionsLength - 1 ? ( 
         <button onClick={nextQuestion}>Next Question</button> 
       ) : (
            <div className="summary">
                {toggleVisibility()}
               <p>{`You got ${questionsCorrect} of ${questionsLength} right.`}</p>
               <p>{getMessage()}</p>
               <p>This was attempt number {quizAttempts}.{buttons}</p>
             </div>
        )}
        </div>
     )

}

export default Button;