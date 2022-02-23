const isProduction = false;
const e = React.createElement;
const quotesContainer = document.createElement("script")
const quotesContainerStyles = document.createElement("link")
let minStr = isProduction ? ".min" : ""

quotesContainer.src = `./fcc/quote/Components/QuoteContainer${minStr}.js`
quotesContainerStyles.href = `./fcc/quote/styles/QuotesApp${minStr}.css`
quotesContainerStyles.rel = "stylesheet"
document.body.appendChild(quotesContainer)
document.head.appendChild(quotesContainerStyles) 

window.addEventListener("load", () => {
    class LikeButton extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                quotes: []
            }
            this.updateQuotes = this.updateQuotes.bind(this)
        }

        updateQuotes() {
            fetch("https://type.fit/api/quotes")
                .then(res=> {
                    let resOK = res.ok ? res.ok : (res.status >= 200 && res.status < 400)
                    if(resOK) {
                        return res.json()
                    }
                })
                .then(data=>{
                    this.setState({quotes:data})
                })
            return []
        }

        render() {
            return e(
                QuoteContainer,
                {quotes: this.state.quotes.length > 0 ? this.state.quotes : this.updateQuotes()}
            );
        }
    }
    
    const domContainer = document.querySelector('#quotes');
    ReactDOM.render(e(LikeButton), domContainer);
})