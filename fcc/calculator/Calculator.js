const isProduction = false;
const e = React.createElement;
const previewContainer = document.createElement("script")
const calculatorContainer = document.createElement("script")
const calculatorStyles = document.createElement("link")
let minStr = isProduction ? ".min" : ""

previewContainer.src = `./fcc/calculator/Components/CalculationPreviewContainer${minStr}.js`
calculatorContainer.src = `./fcc/calculator/Components/CalculatorContainer${minStr}.js`
calculatorStyles.href = `./fcc/calculator/styles/CalculatorApp${minStr}.css`
calculatorStyles.rel = "stylesheet"
document.body.appendChild(previewContainer)
document.body.appendChild(calculatorContainer)
document.head.appendChild(calculatorStyles) 

window.addEventListener("load", () => {
    class CalculatorApp extends React.Component {
        constructor(props) {
            super(props);
            const numBtns = {
                "nine": 9,
                "eight": 8, 
                "seven": 7, 
                "six": 6, 
                "five": 5, 
                "four": 4, 
                "three": 3, 
                "two": 2, 
                "one": 1, 
                "decimal": ".", 
                "zero": 0, 
            }
            const basicFuncBtns = {
                "multiply": "×",
                "subtract": "-",
                "add": "+",
                "equals": "=",
            }
            const lessBasicFuncBtns = {
                "clear": "AC",
                "percentage": "%",
                "divide": "÷",
            }
            const funcValues = {
                "×": (x,y) => parseFloat(x * y),
                "-": (x,y) => parseFloat(x - y),
                "+": (x,y) => parseFloat(x + y),
                "%": (x) => parseFloat(x * 0.01),
                "÷": (x,y) => parseFloat(x / y),
            }
            this.state = {
                numBtns,
                basicFuncBtns,
                lessBasicFuncBtns,
                isLastNum: false,
                shouldClearHistory: false,
                lastActive: "",
                mainDisplay: "0",
                calcHistory: "",
                funcValues,
                flExpression: false,
            }
            this.getActive = this.getActive.bind(this)
            this.runCalc = this.runCalc.bind(this)
        }

        getActive(event) {
            const clickedEl = event.target
            const clickedID = clickedEl.id
            const numRegEx = /^[-]?[0-9.]+$/
            const {lastActive, calcHistory, isLastNum, shouldClearHistory, mainDisplay} = this.state
            const currentDisplay = document.querySelector(".last-typed").innerText
            let isNum = false, clearHistory = false
            let newDisplay = "", newCalc = "", lastStr = "", newHistory = "", lastCharIdx = -1, newLastActive = ""
            const shouldConcatenate = !shouldClearHistory &&(numRegEx.test(lastActive) || (currentDisplay === "-" && isLastNum))

            if (clickedEl.parentElement.classList.contains("nums")) {
                const nextVal = (mainDisplay && mainDisplay.includes(".") && clickedID === "decimal") ? "" : event.target.innerText
                newDisplay = (shouldConcatenate ? mainDisplay : "") + nextVal
                newDisplay = newDisplay[newDisplay.length - 1] !== "." && parseFloat(newDisplay) === 0 ? "0" : newDisplay
                newCalc = shouldClearHistory ? "" : this.state.calcHistory
                isNum = true
            } else {
                switch(clickedID) {
                    case "clear":
                        break;
                    case "equals":
                        lastStr  = isLastNum ? currentDisplay : ""
                        newHistory = calcHistory
                        newDisplay = this.runCalc(newHistory+lastStr)
                        newLastActive = event.target.innerText
                        clearHistory = true;
                        break
                    case "percentage":
                        newDisplay = event.target.innerText
                        lastStr = isLastNum ? (currentDisplay + newDisplay) : ""
                        newHistory = shouldClearHistory ? mainDisplay + newDisplay : calcHistory
                        break
                    case "subtract":
                        newDisplay = event.target.innerText
                        lastStr = isLastNum ? (currentDisplay + newDisplay) : ""
                        newHistory = shouldClearHistory ? mainDisplay + newDisplay : calcHistory
                        isNum = !numRegEx.test(mainDisplay)
                        break
                    default:
                        newDisplay = event.target.innerText
                        lastStr = isLastNum ? (currentDisplay + newDisplay) : ""
                        newHistory = shouldClearHistory ? mainDisplay + newDisplay : calcHistory
                        if (mainDisplay.length === 1 && !isLastNum) {
                            lastCharIdx = newHistory.length - 1
                            newHistory = newHistory.substring(0, lastCharIdx) + newDisplay
                        }
                        break
                }

                newCalc = newHistory + lastStr
            }

            newLastActive = newLastActive === "" ? newDisplay : lastActive

            this.setState({
                lastActive: newLastActive,
                mainDisplay: newDisplay,
                calcHistory: newCalc,
                isLastNum: isNum,
                shouldClearHistory: clearHistory,
            })
        }

        runCalc(calcHistory) {
            const operatorArray = calcHistory.split(/[\d.]/).filter(Boolean)
            const numsArray = calcHistory.split(/[%÷×\-+]/).filter(Boolean)
            const {flExpression} = this.state
            let total

            if (flExpression) {
                total = [...numsArray]
                let i = 0;
                let loopCnt = 1
                while (total.length > 1) {
                    if (i > total.length - 2) {
                        i = 0
                        loopCnt++
                    }
                    let operator = operatorArray[i]
                    let operation = this.state.funcValues[operator]
                    let curVal = parseFloat(total[i])
                    let nextVal = parseFloat(total[i + 1])
                    console.log(curVal, nextVal, total[i])
                    if ("÷×".includes(operator) && loopCnt === 1) {
                        total[i] = operation(curVal, nextVal)
                        console.log(total[i])
                        total.splice(i + 1, 1)
                        operatorArray.splice(i, 1)
                    } else if (loopCnt > 1) {
                        total[i] = operation(curVal, nextVal)
                        console.log(total[i])
                        total.splice(i + 1, 1)
                        operatorArray.splice(i, 1)
                    } else if (loopCnt > 2) {
                        console.log("well... that shouldn't be.")
                        break;
                    } else {
                        console.log("hello there")
                    }
                    i++
                }
                total = total[0]
            } else {
                total = parseFloat(numsArray[0])
                for (let i = 0;i < operatorArray.length; i++) {
                    let operator = operatorArray[i]
                    let operation = this.state.funcValues[operator]
                    let nextVal = parseFloat(numsArray[i+1])
                    total = operation(total, nextVal)
                }
            }

            return total.toString()
        }

        render() {
            return (e(
                "div",
                {className:"container", tabIndex: 0, onKeyDown:this.musicalTyping},
                [e(
                    PreviewContainer,
                    {key: "preview", active:this.state.mainDisplay, history:this.state.calcHistory}
                ), e(
                    "div",
                    {key: "button-container", className: "calc-container"},
                    [e(
                        CalculatorContainer,
                        {key: "func1", btns: this.state.lessBasicFuncBtns, getActive: this.getActive, className: "top"}
                    ), e(
                        CalculatorContainer,
                        {key: "nums", btns: this.state.numBtns, getActive: this.getActive, className: "nums"}
                    ), e(
                        CalculatorContainer,
                        {key: "func2", btns: this.state.basicFuncBtns, getActive: this.getActive, className: "right"}
                    )]
                )]
            ))
        }
    }
    
    const domContainer = document.querySelector('#calculator');
    ReactDOM.render(e(CalculatorApp), domContainer);
})