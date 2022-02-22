const button = document.createElement("script")
button.src = `./fcc/quote/Components/Button${minStr}.js`
document.body.appendChild(button)

class Buttons extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(e(
            "div",
            {
                className: "btn-wrapper"
            },
            [
                e(Button, {
                        id:"new-quote",
                        key:"quote-button",
                        href:"#",
                        className:"btn",
                        onClick: this.props.updateIndex,
                        content: "New Quote",
                    }
                ), 
                e(Button, {
                        id:"tweet-quote", 
                        key:"tweet-button", 
                        href:"https://twitter.com/intent/tweet",
                        target:"_blank",
                        className:"btn",
                        content: e("i", {className:"fa-brands fa-twitter"}),
                    }
                )
            ]
        ))
    }
}