class PreviewContainer extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(e(
            "div",
            {className:"preview"},
            [
                e(
                    "div",
                    {key: "history", className:"history"},
                    this.props.history ? this.props.history : "0"
                ),
                e(
                    "div",
                    {key:"lastTyped", id:"display", className:"last-typed"},
                    this.props.active ? this.props.active : "0"
                )
            ]
        ))
    }
}