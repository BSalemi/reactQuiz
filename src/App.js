import React from 'react';
import Quiz from './components/Quiz.js'
import {quizzes} from './data/quizzes.js'


class App extends React.Component{

  state = {
    quizIndex: 0,
    quizAttempts: 1
  }

  generateQuiz = () => {
    const {quizIndex, quizAttempts} = this.state,
          currentQuiz = quizzes[quizIndex],
          quizzesLength = quizzes.length

    return <Quiz key={quizIndex} title={currentQuiz.title} questions={currentQuiz.questions} quizIndex={quizIndex} quizAttempts={quizAttempts} nextQuiz={this.nextQuiz} firstQuiz={this.firstQuiz} quizzesLength={quizzesLength}/>
  }

  nextQuiz = () =>{
    this.setState((prevState) => {
      return{
        ...this.state,
        quizIndex: prevState.quizIndex + 1
      }
    })
  }

  firstQuiz = () => {
    this.setState({
        ...this.state,
        quizIndex: 0
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
