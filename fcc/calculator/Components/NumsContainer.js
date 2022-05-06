const nums = document.createElement("script")
// nums.src = `./fcc/calculator/Components/Calc${minStr}.js`
document.body.appendChild(nums)

class NumsContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            calculator: "calculator"
        }
    }

    render() {
        return(e(
            "div",
            {className:"num-btns-container"},
            this.state.calculator
        ))
    }
}