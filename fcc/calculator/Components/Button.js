const calcContainer = document.createElement("script")
// calcContainer.src = `./fcc/calculator/Components/Calc${minStr}.js`
document.body.appendChild(calcContainer)

class Button extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            calculator: "calculator"
        }
    }

    render() {
        return(e(
            "div",
            {className:"btn", id: this.props.id},
            this.props.text
        ))
    }
}