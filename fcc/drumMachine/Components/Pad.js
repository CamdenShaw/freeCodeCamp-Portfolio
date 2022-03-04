class Pad extends React.Component {
    constructor(props){
        super(props)
        const pathArr = this.props.sample.split("/")
        this.state = {
            uniqueID: pathArr[pathArr.length - 1].split(".")[0]
        }
    }

    render() {
        return(e(
            "div",
            {className:"drum-pad", id:this.state.uniqueID, ...this.props},
            [
                e(
                    React.Fragment,
                    {key:"text"},
                    this.props.trigger
                ), e(
                    "audio",
                    {key: "sound", className:"clip", id:this.props.trigger, src: this.props.sample},
                    "Your browser does not support the <audio> element"
                )
            ]
        ))
    }
}