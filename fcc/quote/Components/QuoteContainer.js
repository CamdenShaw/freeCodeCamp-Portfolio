const quote = document.createElement("script")
const author = document.createElement("script")
const buttons = document.createElement("script")
quote.src = `./fcc/quote/Components/Quote${minStr}.js`
author.src = `./fcc/quote/Components/Author${minStr}.js`
buttons.src = `./fcc/quote/Components/Buttons${minStr}.js`
document.body.appendChild(quote)
document.body.appendChild(author)
document.body.appendChild(buttons)

class QuoteContainer extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quoteIndex: Math.round(Math.random() * 20)
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex() {
        this.setState({
            quoteIndex: Math.round(Math.random() * 20)
        })
    }

    render() {
        return(e(
            "div",
            {className: "container", id:"quote-box"},
            [e(Quote, {key:"quote",quoteIndex:this.state.quoteIndex}), e(Author, {key:"author", quoteIndex:this.state.quoteIndex}), e(Buttons, {key:"buttons", updateIndex:this.updateIndex})]
        ))
    }
}