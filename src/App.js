import React from 'react';
import Quiz from './components/Quiz.js'
import {quizzes} from './data/quizzes.js'


class App extends React.Component{

  state = {
    currentQuizIndex: 0
  }

  generateQuiz = () => {
    const {currentQuizIndex} = this.state
    const currentQuiz = quizzes[currentQuizIndex]

    return <Quiz key={currentQuizIndex} title={currentQuiz.title} questions={currentQuiz.questions} currentQuizIndex={currentQuizIndex} nextQuiz={this.nextQuiz} />
  }

  nextQuiz = () =>{
    this.setState((prevState) => {
      return{
        currentQuizIndex: prevState.currentQuizIndex + 1
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
