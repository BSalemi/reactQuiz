import React from 'react';

import Quiz from 'components/Quiz/Quiz.js'
import {quizzes} from 'data/quizzes'


class App extends React.Component{

  state = {
    quizIndex: 0,
    quizAttempts: {}
    }

    componentDidMount() {
      const attempts = { [this.state.quizIndex]: 1 }
      this.setState({ ...this.state, quizAttempts: { ...attempts } })
    }

  generateQuiz = () => {
    const {quizIndex}= this.state,
          currentQuiz = quizzes[quizIndex],
          quizzesLength = quizzes.length,
          quizAttempts = this.state.quizAttempts[quizIndex]

    return (
      <Quiz
        key={quizIndex}
        title={currentQuiz.title}
        questions={currentQuiz.questions}
        firstQuiz={this.firstQuiz}
        nextQuiz={this.nextQuiz}
        quizAttempts={quizAttempts}
        quizIndex={quizIndex}
        quizzesLength={quizzesLength}
        updateQuizAttempts={this.updateQuizAttempts}
      />
    )
  }

  nextQuiz = () =>{
    this.setState((prevState) => {
      return{
        ...this.state,
        quizIndex: prevState.quizIndex + 1
      }
    })
    this.updateQuizAttempts()
  }

  firstQuiz = () => {
    this.setState({
        ...this.state,
        quizIndex: 0
    })
    this.updateQuizAttempts()
  }

  updateQuizAttempts = () => {
    this.setState(prevState => {
      const prevAttempts = prevState.quizAttempts[prevState.quizIndex] || 0;
      return {
        quizAttempts: { ...prevState.quizAttempts, [prevState.quizIndex]: prevAttempts + 1 }
      }
    })
  }

  render(){
    return (
      <div className="App">
        {this.generateQuiz()}
      </div>
    );
  }
}


export default App;
