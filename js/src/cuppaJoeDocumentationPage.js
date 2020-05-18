$(document).ready(() => {
    let view,
        headerMenuHeight = getComputedStyle(document.documentElement).getPropertyValue("--header-menu-height")

    $("body").scrollspy({
        spy: "scroll",
        target: "#navbar",
        offset: 96
    })

    $("#navbar a").click(function(event) {
        event.preventDefault()

        view = $(this.hash)[0].offsetTop - parseInt(headerMenuHeight, 10)

        $("html, body").animate(
            {
                scrollTop: view
            },
            300
        )
    })
})
