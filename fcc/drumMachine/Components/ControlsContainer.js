class ControlContainer extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(e(
            "div",
            {className:"controls", id:"display"},
            this.props.active
        ))
    }
}