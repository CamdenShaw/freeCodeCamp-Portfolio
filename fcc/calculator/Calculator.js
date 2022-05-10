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
                "multiply": "&times;",
                "subtract": "-",
                "add": "+",
                "equals": "=",
            }
            const lessBasicFuncBtns = {
                "clear": "AC",
                "percentage": "%",
                "divide": "&#247;",
            }
            this.state = {
                numBtns,
                basicFuncBtns,
                lessBasicFuncBtns,
                isLastNum: false,
                shouldClearHistory: false,
                lastActive: "",
                calcHistory: "",
            }
            this.getActive = this.getActive.bind(this)
            this.runCalc = this.runCalc.bind(this)
            this.getPercentage = this.getPercentage.bind(this)
        }

        getActive(event) {
            const clickedEl = event.target
            const clickedID = clickedEl.id
            const numRegEx = /^[-]?[0-9.]+$/
            const {lastActive, calcHistory, isLastNum, shouldClearHistory} = this.state
            const currentDisplay = document.querySelector(".last-typed").innerText
            let isNum = false, clearHistory = false
            let newDisplay = "", newCalc = "", lastStr = "", newHistory = ""

            if (clickedEl.parentElement.classList.contains("nums")) {
                const nextVal = (lastActive && lastActive.includes(".") && clickedID === "decimal") ? "" : event.target.innerText
                const shouldConcatenate = (numRegEx.test(lastActive) || (currentDisplay === "-" && isLastNum))
                newDisplay = (shouldConcatenate ? lastActive : "") + nextVal
                newDisplay = newDisplay[newDisplay.length - 1] !== "." && parseFloat(newDisplay) === 0 ? "0" : newDisplay
                newCalc = shouldClearHistory ? "" : this.state.calcHistory
                isNum = true
            } else {
                switch(clickedID) {
                    case "clear":
                        break;
                    case "equals":
                        newDisplay = this.runCalc()
                        lastStr  = isLastNum ? currentDisplay : ""
                        newHistory = calcHistory
                        clearHistory = true;
                        break
                    case "percentage":
                        this.getPercentage()
                        newDisplay = event.target.innerText
                        lastStr = isLastNum ? (currentDisplay + newDisplay) : ""
                        newHistory = shouldClearHistory ? "" : calcHistory
                        break
                    case "subtract":
                        newDisplay = event.target.innerText
                        lastStr = isLastNum ? (currentDisplay + newDisplay) : ""
                        newHistory = shouldClearHistory ? "" : calcHistory
                        isNum = !numRegEx.test(lastActive)
                        break
                    default:
                        newDisplay = event.target.innerText
                        lastStr = isLastNum ? (currentDisplay + newDisplay) : ""
                        newHistory = shouldClearHistory ? "" : calcHistory
                        break
                }
                newCalc = newHistory + lastStr
            }
            this.setState({
                lastActive: newDisplay,
                calcHistory: newCalc,
                isLastNum: isNum,
                shouldClearHistory: clearHistory,
            })
        }

        runCalc() {
            console.log("calculating...")
        }

        getPercentage() {
            console.log("getting percentage...")
        }

        render() {
            return (e(
                "div",
                {className:"container", tabIndex: 0, onKeyDown:this.musicalTyping},
                [e(
                    PreviewContainer,
                    {key: "preview", active:this.state.lastActive, history:this.state.calcHistory}
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