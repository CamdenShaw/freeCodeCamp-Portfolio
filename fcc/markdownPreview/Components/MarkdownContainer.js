class MarkdownContainer extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        const {value, typieTypie} = this.props
        return(e(
            "textarea",
            {value, className: "container", id:"editor", onChange:typieTypie},
        ))
    }
}