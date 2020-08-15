import {incorrectResult} from '../helpers.js'

describe('incorrectResult', () => {
    const eventTargetElementDom = { classList: { add: jest.fn() } };
    const correctAnswerElementDom = { classList: { add: jest.fn() } };

it("it should add a class to the eventTargetElementDom", ()=>{
    const className = "incorrect"
    incorrectResult(eventTargetElementDom, correctAnswerElementDom);
    expect(eventTargetElementDom.classList.add).toBeCalledWith(className)
   });

it("it should add a class to the correctAnswer", ()=>{
    const className = "correct"
    incorrectResult(eventTargetElementDom, correctAnswerElementDom);
    expect(correctAnswerElementDom.classList.add).toBeCalledWith(className)
})

})