class MarkdownPreviewContainer extends React.Component {
    constructor(props){
        super(props)
        this.updatePreview = this.updatePreview.bind(this)
    }

    updatePreview() {
        // TODO: mutate typed text
    }

    render() {
        return(e(
            "div",
            {className: "container", id:"preview"},
            this.props.value
        ))
    }
}