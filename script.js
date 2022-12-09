const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const functions = document.querySelectorAll(".function");
const zero = document.querySelector(".zero");
const point = document.querySelector(".point");
const equal = document.querySelector(".equal");
const display = document.querySelector(".display");

let firstNum = "0";
let secondNum = "";
let operator = "";

function resetOperatorBackground() {
    operators.forEach(el => {
        el.style.backgroundColor = "#f69906";
        el.style.color = "white";
    });
}

function setOperatorBackground() {
    resetOperatorBackground();

    if (operator === "+") {
        operators[3].style.backgroundColor = "white";
        operators[3].style.color = "#f69906";
    } else if (operator === "-") {
        operators[2].style.backgroundColor = "white";
        operators[2].style.color = "#f69906";
    } else if (operator === "*") {
        operators[1].style.backgroundColor = "white";
        operators[1].style.color = "#f69906";
    } else if (operator === "/") {
        operators[0].style.backgroundColor = "white";
        operators[0].style.color = "#f69906";
    }
}

numbers.forEach(el => {
    el.addEventListener("click", () => {
        if (operator === "") {
            firstNum = firstNum === "0" ? el.innerText : firstNum + el.innerText;
            display.innerText = firstNum;
        } else if (operator !== "") {
            secondNum = secondNum === "0" ? el.innerText : secondNum + el.innerText;
            display.innerText = secondNum;
            functions[0].innerText = "C";
            resetOperatorBackground();
        }
    });
});

operators.forEach(el => {
    el.addEventListener("click", () => {
        if (secondNum !== "") {
            if (operator === "+") {
                firstNum = String(Number(firstNum) + Number(secondNum));
            } else if (operator === "-") {
                firstNum = String(Number(firstNum) - Number(secondNum));
            } else if (operator === "*") {
                firstNum = String(Number(firstNum) * Number(secondNum));
            } else if (operator === "/") {
                firstNum = String(Number(firstNum) / Number(secondNum));
            }

            display.innerText = firstNum;

            secondNum = "";
        }

        operator = el.getAttribute("name");
        setOperatorBackground();
    });
});

functions.forEach(el => {
    el.addEventListener("click", () => {
        if (el.getAttribute("name") === "ac") {
            if (secondNum === "") {
                firstNum = "0";
                operator = "";
                display.innerText = "0";
                setOperatorBackground();
                el.innerText = "AC"
            } else {
                secondNum = "";
                display.innerText = firstNum;
                el.innerText = "AC"
            }
        } else if (el.getAttribute("name") === "+/-") {
            if (operator === "" && firstNum !== "0") {
                firstNum = String(Number(firstNum) * -1);
                display.innerText = firstNum;
            } else if (operator !== "" && secondNum !== "0") {
                secondNum = String(Number(secondNum) * -1);
                display.innerText = secondNum;
            }
        } else if (el.getAttribute("name") === "%") {
            if (operator === "") {
                firstNum = firstNum / 100;
                display.innerText = firstNum;
            } else {
                secondNum = secondNum / 100;
                display.innerText = secondNum;
            }
        }
    });
});

point.addEventListener("click", () => {
    if (operator === "" && firstNum.indexOf(".") === -1) {
        firstNum += ".";
        display.innerText = firstNum;
    } else if (operator !== "" && secondNum.indexOf(".") === -1) {
        secondNum += ".";
        display.innerText = secondNum;
    }
})

equal.addEventListener("click", () => {
    if (operator !== "") {
        let result;

        if (operator === "+") {
            result = Number(firstNum) + Number(secondNum);
        } else if (operator === "-") {
            result = Number(firstNum) - Number(secondNum);
        } else if (operator === "*") {
            result = Number(firstNum) * Number(secondNum);
        } else if (operator === "/") {
            result = Number(firstNum) / Number(secondNum);
        }

        functions[0].innerText = "AC";
        firstNum = "0";
        secondNum = "";
        operator = "";

        display.innerText = result;
    }
});