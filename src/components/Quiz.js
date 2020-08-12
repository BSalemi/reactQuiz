import React from "react";
import {quizzes} from '../data/quizzes.js'
import {getMessage} from '../data/messages.js'
import Question from "./Question.js";

class Quiz extends React.Component {
  state = {
    currentQuestionIndex: 0,
    isAnswerSelected: false,
    questionsCorrect: 0,
    quizAttempts: 1,
    isCorrect: false,
    shuffledAnswers: []
  };


  generateQuestion = () => {
    const {questions} = this.props
    const {currentQuestionIndex} = this.state

    if(currentQuestionIndex > questions.length-1){
        this.setState({
            ...this.state,
            currentQuestionIndex: 0,
            isAnswerSelected: false,
            questionsCorrect: 0,
            isCorrect: false,
            shuffledAnswers: []
        })
        return this.generateQuestion
    }

    const currentQuestion = questions[currentQuestionIndex];
    const answers = currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer)

    return (
      <Question
        key={currentQuestionIndex}
        text={currentQuestion.text}
        correctAnswer={currentQuestion.correctAnswer}
        incorrectAnswers={currentQuestion.incorrectAnswers}
        currentQuestion={currentQuestionIndex}
        quizLength={questions.length}
        answers={answers}
        shuffleAnswers={this.shuffleAnswers}
        shuffled={this.state.shuffledAnswers}
        checkAnswer={this.checkAnswer}
      />
    );
  };

  shuffleAnswers = (answers) => {
    let counter = answers.length;
    
    while (counter > 0) {
        
      let index = Math.floor(Math.random() * counter);

      counter--;

      let temp = answers[counter];

      answers[counter] = answers[index];
      answers[index] = temp;
    }
   
    this.setState({
        ...this.state,
        shuffledAnswers: answers
    })
   
  };

  renderButton = () => {
      const message = getMessage()
      const {currentQuestionIndex} = this.state;
      const {questions, currentQuizIndex} = this.props
      const questionsLength = questions.length - 1;

      if(currentQuestionIndex < questionsLength){
          return <button onClick={this.nextQuestion}>Next Question</button>
      } else if (currentQuestionIndex >= questionsLength && currentQuizIndex < quizzes.length - 1){ 
            return (
                <div>
                    {this.getSummary()}
                    {message} 
                    <button onClick={this.props.nextQuiz}>Next Quiz</button><button>Retake</button>
                </div>
                )
      } else {
          return <div>
              {this.getSummary()}
              {message}
              <button>Retake</button><button>Back to First Quiz</button>
              </div>
          // this needs work - see Delighter
      }
  }

 checkAnswer = (e) => { 
     e.preventDefault()
    const {questions} = this.props,
          {currentQuestionIndex} = this.state,
           currentQuestion = questions[currentQuestionIndex],
           correctAnswer = currentQuestion.correctAnswer,
           userAnswer = e.target.innerText,
           lists = document.querySelectorAll("li")


    if (userAnswer === correctAnswer) {
        e.target.classList.add("correct");
        this.setState((prevState) => {
            return {
            ...this.state,
            isAnswerSelected: true,
            questionsCorrect: prevState.questionsCorrect + 1,
            isCorrect: true
            };
        });
    } else {
        e.target.classList.add("incorrect");
        lists.forEach((list) => {
            if (list.innerText === this.props.correctAnswer) {
                list.classList.add("correct");
            }
        })
        this.setState({
            ...this.state,
            isAnswerSelected: true
        })
    }
  }
  nextQuestion = () => {
     
    const lists = document.querySelectorAll("li");

    this.removeClasses(lists)

    this.setState((prevState) => {
        return {
          ...this.state,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          isAnswerSelected: false,
          isCorrect: false,
        }
      });
    }


  removeClasses = (lists) => {
    lists.forEach((list) => {
        if (list.classList.contains("correct")) {
            list.classList.remove("correct");
        }
        if(list.classList.contains("incorrect")){
            list.classList.remove("incorrect")
        }
    })
  }

  getSummary(){
      const {questions} = this.props,
            {questionsCorrect} = this.state,
            numberOfQuestions = questions.length 

      return `You got ${questionsCorrect} of ${numberOfQuestions} right.`
  }

//   getQuizAttempts = (quizIndex) => {
//       const {quizAttempts} = this.state

//       if(!quizAttempts[quizIndex]){
//         this.setState({
//             quizAttempts:{
//                 [quizIndex]: 1
//             }
//         }); 
//       } else {
//           this.setState((prevState) => {
//               return{
//                   quizAttempts:{
//                     [quizIndex]: prevState.quizIndex += 1
//                   }
//               }
//           })
//       }
//   }

  render() {
    const {title} = this.props
    const {isAnswerSelected, isCorrect} = this.state
    let button
    let answerStatus
    // const { currentQuestionIndex } = this.state;

    if(isAnswerSelected){
        button = this.renderButton()
        if(isCorrect){
            answerStatus = "Correct!"
        } else {
            answerStatus = "Incorrect..."
        }
    } else {
        button = null
    }

    return (
      <div>
        <h1>{title}</h1>

        {this.generateQuestion()}
        {answerStatus}
        {button}
        {/* if({isAnswerSelected}) {
            if({isCorrect}){
                "Correct!"
            } else {
                
            }
        } && isCorrect ? "Correct!" : "Incorrect..."}
        {isAnswerSelected ? this.renderButton() : null} */}
      </div>
    );
  }
}


export default Quiz;
