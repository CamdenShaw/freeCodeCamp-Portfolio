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
            quoteIndex: null
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex() {
        this.setState({
            quoteIndex: Math.floor(Math.random() * this.props.quotes.length)
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.quotes.length > 0 && this.state.quoteIndex === null) {
            this.updateIndex()
            return true
        } else if (nextProps.quotes.length > 0 && nextState.quoteIndex !== null) {
            return true
        }
        return false
    }

    render() {
        const {quotes} = this.props
        const {quoteIndex} = this.state
        const text = quoteIndex === null ? "loading" : quotes[quoteIndex].text
        const author = quoteIndex === null ? "" : quotes[quoteIndex].author
        return(e(
            "div",
            {className: "container", id:"quote-box"},
            [e(Quote, {text, key:"quote",quoteIndex:this.state.quoteIndex}), e(Author, {author,key:"author", quoteIndex:this.state.quoteIndex}), e(Buttons, {key:"buttons", updateIndex:this.updateIndex})]
        ))
    }
}