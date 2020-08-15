import {correctResult} from '../helpers.js'

describe('correctResult', () => {
    const targetElementDom = { classList: { add: jest.fn() } };

it("it should add a class to the event targetElementDom", ()=>{
    const className = "correct"
    correctResult(targetElementDom);
    expect(targetElementDom.classList.add).toBeCalledWith(className)
   })
})