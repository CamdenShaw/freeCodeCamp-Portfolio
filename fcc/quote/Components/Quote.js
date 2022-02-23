class Quote extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(e(
            "blockquote",
            {
                id: "text",
            },
            this.props.text
        ))
    }
}