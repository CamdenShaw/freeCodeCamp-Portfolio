$(document).ready(() => {
    let view,
        headerMenuHeight = getComputedStyle(document.documentElement).getPropertyValue("--header-menu-height")

    console.log(headerMenuHeight)

    $("body").scrollspy({
        spy: "scroll",
        target: "#nav-bar",
        offset: 96
    })

    $(".navbar li a").click(function(event) {
        event.preventDefault()

        view = $(this.hash)[0].offsetTop - parseInt(headerMenuHeight, 10)

        $("html, body, .main-site").animate(
            {
                scrollTop: view
            },
            300
        )
    })
})
