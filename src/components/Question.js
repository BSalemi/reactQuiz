import React from 'react';

class Question extends React.Component {
  

    shuffleAnswers = () => {
      const {answers} = this.props
      let counter = answers.length;
  
      while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
  
        counter--;
  
        let temp = answers[counter];
  
        answers[counter] = answers[index];
        answers[index] = temp;
      }
  
      return answers;
    };
  
    generateAnswers = (answersArray) => {
      const answers = answersArray.map((answer) => {
        return <li onClick={(event) => this.props.selectAnswer(event)}>{answer}</li>
        })
      return answers;
    };
  
    // 
  
    // removeClasses = ()
    render() {
      const {text} = this.props;
      const answers = this.shuffleAnswers()
      // const { answerSelected, questionStatus } = this.state;
      return (
        <div>
          <h3> {text}</h3>
          
          <ol type="A">{this.generateAnswers(answers)}</ol>
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
