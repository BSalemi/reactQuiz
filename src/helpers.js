export const correctResult = (elementDOM) => {
    elementDOM.classList.add("correct");
}

export const incorrectResult = (elementDOM, props) => {
    const lists = document.querySelectorAll("li");

    elementDOM.classList.add("incorrect");

    lists.forEach((list) => {
        if (list.innerText === props) {
            list.classList.add("correct");
        }
    });
}