import React from 'react';

class Question extends React.Component {
  
    state={
        correctAnswer: this.props.correctAnswer,
        incorrectAnswers: this.props.incorrectAnswers,
    }

    componentDidMount(){
        const {shuffleAnswers, answers} = this.props
        shuffleAnswers(answers)
    }

    generateAnswers = () => {
      const answers = this.props.shuffled.map((answer) => {
        return <li onClick={(event) => this.props.checkAnswer(event)}>{answer}</li>
        })
      return answers;
    };

    render() {
      const {text} = this.props;
     
      // const { answerSelected, questionStatus } = this.state;
      return (
        <div>
          <h3> {text}</h3>
          
          <ol type="A">{this.generateAnswers()}</ol>
          {/* {currentQuestion < questions.length - 1 && answerSelected ? (
            <>
              {questionStatus ? <p>Correct!</p> : <p>Incorrect...</p>}
              <button onClick={nextQuestion}>Next Question</button>
            </>
          ) : null} */} 
        </div>
      );
    }
  }
  
  export default Question;
