class Quote extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }

    render() {
        return(e(
            "blockquote",
            {
                id: "text",
            },
            "quote" + this.props.quoteIndex
        ))
    }
}