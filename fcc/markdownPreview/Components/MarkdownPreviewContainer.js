class MarkdownPreviewContainer extends React.Component {
    constructor(props){
        super(props)
        this.updatePreview = this.updatePreview.bind(this)
    }

    updatePreview() {
        return {__html: marked.parse(this.props.value)}
    }

    render() {
        return(e(
            "div",
            {className: "container", id:"preview", dangerouslySetInnerHTML:this.updatePreview()}
        ))
    }
}