class Pad extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(e(
            "div",
            {className:"pad", ...this.props},
            [
                e(
                    React.Fragment,
                    {key:"text"},
                    this.props.trigger
                ), e(
                    "audio",
                    {key: "sound"},
                    "Your browser does not support the <audio> element"
                )
            ]
        ))
    }
}