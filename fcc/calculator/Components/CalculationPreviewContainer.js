class PreviewContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            calculator: "0123456789"
        }
    }

    render() {
        return(e(
            "div",
            {className:"preview"},
            this.state.calculator
        ))
    }
}