class Author extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
    }

    render() {
        return(e(
            "cite",
            {
                id: "author",
            },
            "author" + this.props.quoteIndex
        ))
    }
}