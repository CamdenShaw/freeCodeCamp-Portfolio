class Author extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(e(
            "cite",
            {
                id: "author",
            },
            this.props.author
        ))
    }
}