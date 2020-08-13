import React from 'react';
import Quiz from './components/Quiz.js'
import {quizzes} from './data/quizzes.js'


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

    return <Quiz key={quizIndex} title={currentQuiz.title} questions={currentQuiz.questions} quizIndex={quizIndex} quizAttempts={quizAttempts} nextQuiz={this.nextQuiz} firstQuiz={this.firstQuiz} quizzesLength={quizzesLength} updateQuizAttempts={this.updateQuizAttempts}/>
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
    console.log(this.state.quizAttempts[this.state.quizIndex], "quizAttempts?")
    return (
      <div className="App">
        {this.generateQuiz()}
      </div>
    );
  }
}
  

export default App;
