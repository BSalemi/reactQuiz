import React from "react";
import Question from "./Question.js";
import Button from "./Button.js"

class Quiz extends React.Component {
  state = {
    questionIndex: 0,
    isAnswerSelected: false,
    questionsCorrect: 0,
    isCorrect: false,
    shuffledAnswers: []
  };


  generateQuestion = () => {
    const {questions} = this.props
    let {questionIndex} = this.state

    if(questionIndex > questions.length-1){
        this.setState({
            ...this.state,
            questionIndex: 0,
            isAnswerSelected: false,
            questionsCorrect: 0,
            isCorrect: false,
            shuffledAnswers: []
        })
        questionIndex = 0
    }

    const currentQuestion = questions[questionIndex];
    const answers = currentQuestion.incorrectAnswers.concat(currentQuestion.correctAnswer)

    return (
      <Question
        key={questionIndex}
        text={currentQuestion.text}
        correctAnswer={currentQuestion.correctAnswer}
        incorrectAnswers={currentQuestion.incorrectAnswers}
        currentQuestion={questionIndex}
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

//   
 checkAnswer = (e) => { 
     e.preventDefault()
    const {questions} = this.props,
          {questionIndex, isAnswerSelected} = this.state,
           currentQuestion = questions[questionIndex],
           correctAnswer = currentQuestion.correctAnswer,
           userAnswer = e.target.innerText,
           lists = document.querySelectorAll("li")

    if(isAnswerSelected === false){
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
    
  }

  nextQuestion = () => {
    document.querySelectorAll("li").forEach((list) => {
        list.classList.contains("correct")
          ? list.classList.remove("correct")
          : list.classList.remove("incorrect");
      });

    this.setState((prevState) => {
        return {
          ...this.state,
          questionIndex: prevState.questionIndex + 1,
          isAnswerSelected: false,
          isCorrect: false,
        }
      });
    }

    retakeQuiz = () => {
        this.props.updateQuizAttempts()
        this.setState({
                questionIndex: 0,
                isAnswerSelected: false,
                questionsCorrect: 0,
                isCorrect: false,
                shuffledAnswers: []
        })
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


toggleVisibility = () =>{
    let questionsDiv = document.querySelector(".questionsDiv")

    questionsDiv.hasAttribute("id") ? questionsDiv.removeAttribute("id") : questionsDiv.id = 'hidden'
}


  render() {
    const {title, questions, quizzesLength, quizIndex, quizAttempts} = this.props
    const {isAnswerSelected, isCorrect, questionIndex, questionsCorrect} = this.state

    return (
      <div className="quizDiv">
        <h1>{title}</h1>

        {this.generateQuestion()}

        {isAnswerSelected ?
        (<Button nextQuiz={this.props.nextQuiz} nextQuestion={this.nextQuestion} retakeQuiz={this.retakeQuiz} firstQuiz={this.props.firstQuiz} questionIndex={questionIndex} questionsLength={questions.length} questionsCorrect={questionsCorrect} isCorrect={isCorrect} quizAttempts={quizAttempts} quizIndex={quizIndex} quizzesLength={quizzesLength} toggleVisibility={this.toggleVisibility} isAnswerSelected={isAnswerSelected}/>) : null}

      </div>
    );
  }
}


export default Quiz;
