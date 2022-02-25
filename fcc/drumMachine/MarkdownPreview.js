const isProduction = true;
const e = React.createElement;
const drumMachineContainer = document.createElement("script")
const drumMachineStyles = document.createElement("link")
let minStr = isProduction ? ".min" : ""

drumMachineContainer.src = `./fcc/drumMachine/Components/DrumMachineContainer${minStr}.js`
drumMachineStyles.href = `./fcc/drumMachine/styles/DrumMachineApp${minStr}.css`
drumMachineStyles.rel = "stylesheet"
document.body.appendChild(drumMachineContainer)
document.head.appendChild(drumMachineStyles) 

window.addEventListener("load", () => {
    class DrumMachineApp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            }
        }

        render() {
            return (e(
                DrumContainer,
                {}
            ))
        }
    }
    
    const domContainer = document.querySelector('#drum-machine');
    ReactDOM.render(e(DrumMachineApp), domContainer);
})