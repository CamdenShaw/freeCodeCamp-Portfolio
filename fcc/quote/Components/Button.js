class Button extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (e(
            "a",
            {...this.props},
            this.props.content
        ))
    }
}
