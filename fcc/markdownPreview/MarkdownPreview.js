const isProduction = false;
const e = React.createElement;
const markdownContainer = document.createElement("script")
const markdownPreviewContainer = document.createElement("script")
const markdownContainerStyles = document.createElement("link")
let minStr = isProduction ? ".min" : ""

markdownContainer.src = `./fcc/markdownPreview/Components/MarkdownContainer${minStr}.js`
markdownPreviewContainer.src = `./fcc/markdownPreview/Components/markdownPreviewContainer${minStr}.js`
markdownContainerStyles.href = `./fcc/markdownPreview/styles/MarkdownPreviewApp${minStr}.css`
markdownContainerStyles.rel = "stylesheet"
document.body.appendChild(markdownContainer)
document.body.appendChild(markdownPreviewContainer)
document.head.appendChild(markdownContainerStyles) 

marked.setOptions({
    gfm: true,
    breaks: true,
})

window.addEventListener("load", () => {
    class MdPApp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                inputValue: "# preview\n1. numbered list\n\n## some more previews\n* unordered list\n\n> blockquotes are **overdone**\n\n       document.getElementById(\"fcc\")\n`<img src=\"./assets/svgs/fcc_write_music.svg\" />`\n![Some random icon](./assets/svgs/fcc_write_music.svg)\nMy favorite search engine is [Duck Duck Go](https://duckduckgo.com \"The best search engine for privacy\").",
            }
            this.captureInput = this.captureInput.bind(this)
        }

        captureInput(e) {
            this.setState({
                inputValue: e.target.value
            })
        }

        render() {
            return (e(
                "div",
                {},
                [e(
                    MarkdownContainer,
                    {value:this.state.inputValue, typieTypie:this.captureInput, key:"input"}
                ), e(
                    MarkdownPreviewContainer,
                    {value:this.state.inputValue, key:"preview"}
                )]
            ));
        }
    }
    
    const domContainer = document.querySelector('#markdown-preview');
    ReactDOM.render(e(MdPApp), domContainer);
})