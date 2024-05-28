function randomBetween(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomColor = () => {
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    return `rgb(${r},${g},${b})`;
};

function removeChildren(parentElement) {
    if (parentElement.childElementCount > 0) {
        const collection = parentElement.children;
        for (let i = collection.length - 1; i >= 0; i--) {
            parentElement.removeChild(collection[i]);
        }
    }
}

const sketchpad = document.querySelector(".sketchpad");
function createSketchpad(sideDimension) {
    for (let i = 0; i < sideDimension; i++) {
        const flexRow = document.createElement("div");
        flexRow.setAttribute("class", "flexRow");

        for (let i = 0; i < sideDimension; i++) {
            const square = document.createElement("div");
            square.setAttribute("class", "square");
            flexRow.appendChild(square);
        }
        sketchpad.appendChild(flexRow);
    }
}

sketchpad.addEventListener('mouseover', (event) => {
    let targetSquare = event.target;
    if (!(targetSquare.getAttribute("class") === "sketchpad")) {
        targetSquare.style.backgroundColor = getRandomColor();
    }
    event.stopPropagation();
});

const newSketchPadBtn = document.querySelector(".newSketchPadBtn");
newSketchPadBtn.addEventListener('click', (event) => {

    let target = event.target;

    alertify.prompt("Please enter number of squares per side for the new grid!", function (e, squaresNumberInput) {
        if (e) {
            /* alertify.alert("You entered number of squares per side:" + squaresNumberInput); */
            const squaresNumber = parseInt(squaresNumberInput, 10);
            if (isNaN(squaresNumber) || (squaresNumber < 10 || squaresNumber > 100)) {
                alertify.alert("Operation Cancelled! Please enter a number between 10 and 100...");
            } else {
                removeChildren(sketchpad);
                createSketchpad(squaresNumber)
            }
        } else {
            alertify.alert("Operation Cancelled!");
        }
    }, "Number of squares per side for the new grid");

    event.stopPropagation();
});

