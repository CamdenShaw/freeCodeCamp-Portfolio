const isProduction = false;
const e = React.createElement;
const previewContainer = document.createElement("script")
const calculatorContainer = document.createElement("script")
const numsContainer = document.createElement("script")
const calculatorStyles = document.createElement("link")
let minStr = isProduction ? ".min" : ""

previewContainer.src = `./fcc/calculator/Components/CalculationPreviewContainer${minStr}.js`
calculatorContainer.src = `./fcc/calculator/Components/CalculatorContainer${minStr}.js`
numsContainer.src = `./fcc/calculator/Components/NumsContainer${minStr}.js`
calculatorStyles.href = `./fcc/calculator/styles/CalculatorApp${minStr}.css`
calculatorStyles.rel = "stylesheet"
document.body.appendChild(previewContainer)
document.body.appendChild(calculatorContainer)
document.body.appendChild(numsContainer)
document.head.appendChild(calculatorStyles) 

window.addEventListener("load", () => {
    class CalculatorApp extends React.Component {
        constructor(props) {
            super(props);
            const numBtns = ["zero", "decimal", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
            const funcBtns = {
                "add": "+",
                "subtract": "-",
                "multiply": "X",
                "divide": "/",
                "equals": "=",
            }
            this.state = {
                numBtns: numBtns,
                funcBtns: funcBtns,
                lastActive: "",
            }
            this.getActive = this.getActive.bind(this)
            this.musicalTyping = this.musicalTyping.bind(this)
        }

        getActive(event) {
            // const audioElement = event.target.querySelector("audio")
            // this.setState({
            //     lastActive: event.target.innerText
            // })
            // audioElement.play()
        }

        musicalTyping(event) {
            // const target = document.querySelector(`[trigger=${event.key.toUpperCase()}]`)
            // if(target) this.getActive({target})
        }

        render() {
            return (e(
                "div",
                {className:"container", tabIndex: 0, onKeyDown:this.musicalTyping},
                [e(
                    PreviewContainer,
                    {key: "preview", active:this.state.lastActive}
                ), e(
                    NumsContainer,
                    {key: "nums", btns: this.state.numBtns, getActive: this.getActive}
                ), e(
                    CalculatorContainer,
                    {key: "func", btns: this.state.funcBtns, getActive: this.getActive}
                )]
            ))
        }
    }
    
    const domContainer = document.querySelector('#calculator');
    ReactDOM.render(e(CalculatorApp), domContainer);
})