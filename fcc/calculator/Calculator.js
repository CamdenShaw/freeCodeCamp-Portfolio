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
                "multiply": "X",
                "subtract": "-",
                "add": "+",
                "equals": "=",
            }
            const lessBasicFuncBtns = {
                "clear": "AC",
                "percentage": "%",
                "divide": "/",
            }
            this.state = {
                numBtns,
                basicFuncBtns,
                lessBasicFuncBtns,
                lastActive: "",
            }
            this.getActive = this.getActive.bind(this)
        }

        getActive(event) {
            // const audioElement = event.target.querySelector("audio")
            // this.setState({
            //     lastActive: event.target.innerText
            // })
            // audioElement.play()
        }

        render() {
            return (e(
                "div",
                {className:"container", tabIndex: 0, onKeyDown:this.musicalTyping},
                [e(
                    PreviewContainer,
                    {key: "preview", active:this.state.lastActive}
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