import React from "react";
import {quizzes} from '../data/quizzes.js'
import {getMessage} from '../data/messages.js'
import Question from "./Question.js";

class Quiz extends React.Component {
  state = {
    currentQuizIndex: 0,
    currentQuestionIndex: 0,
    answerSelected: false,
    isCorrect: "Correct!",
    isIncorrect: "Incorrect...",
    questionsCorrect: 0,
    quiz:{},
    quizAttempts: {}
  };

  componentDidMount(){
      this.setState({
          quiz: quizzes[this.state.currentQuizIndex],
      })
  }

//   shouldComponentUpdate(nextState) {
//     if (this.state.answerSelected === nextState.answerSelected) {
//       return false;
//     } else {
//       return true;
//     }
//   }

  generateQuestion = () => {
    const {currentQuizIndex, currentQuestionIndex} = this.state
    const currentQuiz = quizzes[currentQuizIndex]
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];


    return (
      <Question
        text={currentQuestion.text}
        correctAnswer={currentQuestion.correctAnswer}
        incorrectAnswers={currentQuestion.incorrectAnswers}
        currentQuestion={this.state.currentQuestionIndex}
        questions={currentQuiz.questions}
        answers={currentQuestion.incorrectAnswers.concat(
          currentQuestion.correctAnswer)}
        selectAnswer={this.selectAnswer}
      />
    );
  };

  renderButton = () => {
      const {currentQuestionIndex, currentQuizIndex} = this.state;
      const currentQuiz = quizzes[currentQuizIndex];
      const questionsLength = currentQuiz.questions.length - 1;


      if(currentQuestionIndex < questionsLength){
          return <button onClick={this.nextQuestion}>Next Question</button>
      } else if (currentQuestionIndex >= questionsLength && currentQuizIndex < quizzes.length - 1){
            
            const message = getMessage()
            return <div> 
                {this.giveSummary()}
                {message} <button>Next Quiz</button>
                </div>
      } else {
          return <button>Retake</button>
          // this needs work - see Delighter
      }
  }

  selectAnswer = (e) => {
    const {quiz, currentQuestionIndex} = this.state
    const currentQuestion = quiz.questions[currentQuestionIndex]
    const correctAnswer = currentQuestion.correctAnswer

    this.setState({
        answerSelected: true
    });

    const userAnswer = e.target.innerText;
    const lists = document.querySelectorAll("li");

    if (userAnswer === correctAnswer) {
        e.target.classList.add("correct");
        // <p>{this.state.isCorrect}</p>
        this.setState((prevState) => {
            return {
            questionsCorrect: prevState.questionsCorrect + 1
            };
        });

    } else {
        e.target.classList.add("incorrect");
        lists.forEach((list) => {
            if (list.innerText === this.props.correctAnswer) {
                list.classList.add("correct");
            }
        });
    }
  }
  nextQuestion = () => {
    const lists = document.querySelectorAll("li");

    this.removeClasses(lists)

    this.setState((prevState) => {
      return {
          ...this.state,
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
          answerSelected: false
        };
    });
    // this.generateQuestion()
  };


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

  giveSummary(){
      const {questionsCorrect, quiz} = this.state
      const numberOfQuestions = quiz.questions.length 

      return `You got ${questionsCorrect} of ${numberOfQuestions} right.`
  }

  render() {
    
    const {currentQuizIndex, answerSelected} = this.state
    const quiz = quizzes[currentQuizIndex]
    // const { currentQuestionIndex } = this.state;
    // console.log(quizzes[this.state.currentQuizIndex], "quiz at index")
    return (
      <div>
        <h1>{quiz.title}</h1>
        {this.generateQuestion()}
        {answerSelected ? this.renderButton() : null}
      </div>
    );
  }
}

export default Quiz;
