
class Toggle extends React.Component {
    constructor(props){
        super(props)
        console.log(this.props.toggleExpression)
    }
    
    render() {
        return(
            e(
                "span", 
                {className:`toggle-wrapper ${this.props.isExpression ? "on" : "off"}`},
                [
                    e(
                        "span",
                        {className: "toggle-text", key: "toggle-text"},
                        "expression: "
                    ),
                    e(
                        "span",
                        {className: "toggle-gutter", key: "toggle-gutter", onClick: this.props.toggleExpression},
                        e(
                            "span",
                            {className: "toggle-switch"}
                        )
                    )
                ]
            )
        )
    }
}