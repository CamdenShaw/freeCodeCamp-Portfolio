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
        }

        render() {
            return e(
                QuoteContainer
            );
        }
    }
    
    const domContainer = document.querySelector('#quotes');
    ReactDOM.render(e(LikeButton), domContainer);
})