const calcContainer = document.createElement("script")
// calcContainer.src = `./fcc/calculator/Components/Calc${minStr}.js`
document.body.appendChild(calcContainer)

class CalculatorContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            calculator: "calculator"
        }
    }

    render() {
        return(e(
            "div",
            {className:"calculator"},
            this.state.calculator
        ))
    }
}