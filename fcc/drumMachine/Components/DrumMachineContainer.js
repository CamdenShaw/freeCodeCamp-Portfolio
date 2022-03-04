const pad = document.createElement("script")
pad.src = `./fcc/drumMachine/Components/Pad${minStr}.js`
document.body.appendChild(pad)

class DrumContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            kit: this.props.kit.map(pad=>e(Pad, {
                trigger:pad.toUpperCase(), 
                key:pad,
                sample: this.props.audio[pad],
                onClick: this.props.getActive
            }))
        }
    }

    render() {
        return(e(
            "div",
            {className:"kit"},
            this.state.kit
        ))
    }
}