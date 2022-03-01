const pad = document.createElement("script")
pad.src = `./fcc/drumMachine/Components/Pad${minStr}.js`
document.body.appendChild(pad)

class DrumContainer extends React.Component {
    constructor(props){
        super(props)
        const kit = !this.props.kit ? ["q", "w", "e", "a", "s", "d", "z", "x", "c"] : this.props.kit
        this.state = {
            kit: kit.map(pad=>e(Pad, {trigger:pad, key:pad}))
        }
        console.log(this.state.kit)
    }

    render() {
        return(e(
            "div",
            {},
            this.state.kit
        ))
    }
}