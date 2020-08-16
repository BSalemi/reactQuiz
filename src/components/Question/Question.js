import React from 'react';

import './Question.css'

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
        return <li className="answer" onClick={(event) => this.props.checkAnswer(event)}>{answer}</li>
        })
      return answers;
    };


    render() {
      const {text} = this.props;

      return (
        <div className="questionsDiv">
          <h3> {text}</h3>

          <ol type="A" className="answerList">{this.generateAnswers()}</ol>

        </div>
      );
    }
  }

  export default Question;
