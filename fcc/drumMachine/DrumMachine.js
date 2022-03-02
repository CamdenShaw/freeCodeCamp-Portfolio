const isProduction = false;
const e = React.createElement;
const drumMachineContainer = document.createElement("script")
const drumControlsContainer = document.createElement("script")
const drumMachineStyles = document.createElement("link")
let minStr = isProduction ? ".min" : ""

drumMachineContainer.src = `./fcc/drumMachine/Components/DrumMachineContainer${minStr}.js`
drumControlsContainer.src = `./fcc/drumMachine/Components/ControlsContainer${minStr}.js`
drumMachineStyles.href = `./fcc/drumMachine/styles/DrumMachineApp${minStr}.css`
drumMachineStyles.rel = "stylesheet"
document.body.appendChild(drumMachineContainer)
document.body.appendChild(drumControlsContainer)
document.head.appendChild(drumMachineStyles) 

window.addEventListener("load", () => {
    class DrumMachineApp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                kit: ["q", "w", "e", "a", "s", "d", "z", "x", "c"],
                lastActive: "",
                audioSources: {
                    q: "./assets/audio/drum_samples/HighHat_tst.m4a",
                    w: "./assets/audio/drum_samples/CowBell.m4a",
                    e: "./assets/audio/drum_samples/HighHat_tt.m4a",
                    a: "./assets/audio/drum_samples/Snare.m4a",
                    s: "./assets/audio/drum_samples/Cowbell.m4a",
                    d: "./assets/audio/drum_samples/Tom.m4a",
                    z: "./assets/audio/drum_samples/Bass.m4a",
                    x: "./assets/audio/drum_samples/Bells.m4a",
                    c: "./assets/audio/drum_samples/Sticks.m4a",
                }
            }
            this.getActive = this.getActive.bind(this)
        }

        getActive(event) {
            this.setState({
                lastActive: event.target.innerText
            })
        }

        render() {
            return (e(
                "div",
                {className:"container"},
                [e(
                    ControlContainer,
                    {key: "control", active:this.state.lastActive}
                ), e(
                    DrumContainer,
                    {key: "kit", kit:this.state.kit, audio:this.state.audioSources, getActive:this.getActive}
                )]
            ))
        }
    }
    
    const domContainer = document.querySelector('#drum-machine');
    ReactDOM.render(e(DrumMachineApp), domContainer);
})