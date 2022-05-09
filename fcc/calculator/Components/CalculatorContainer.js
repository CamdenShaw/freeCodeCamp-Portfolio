const button = document.createElement("script")
button.src = `./fcc/calculator/Components/Button${minStr}.js`
document.body.appendChild(button)

class CalculatorContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            calculator: "calculator"
        }
    }
    
    render() {
        const btns = []
        Object.keys(this.props.btns).forEach(btn => btns.push(e(
            Button,
            {key: `btn-${btn}`,id:btn, text: this.props.btns[btn]}
        )))
        return(
            e(
                "div", 
                {className:`func-wrapper ${this.props.className}`},
                btns
            )
        )
    }
}