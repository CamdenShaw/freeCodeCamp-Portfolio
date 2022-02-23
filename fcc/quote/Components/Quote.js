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
            e("i", {className: "fas fa-quote-left"}, ""),this.props.text
        ))
    }
}