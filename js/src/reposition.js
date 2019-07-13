$(document).ready(() => {
    const mainSite = $(".main-site"),
        totalContentHeight = mainSite[0].scrollHeight

    const reposition = () => {
        let posPercent = 100,
            newPosition = mainSite[0].scrollTop * 10,
            newPosPercent = newPosition / totalContentHeight * -100,
            introSection = $("#intro")
            
        introSection.css({backgroundPositionY: `${50 - (newPosPercent/3)}%`})
        mainSite.css("background-position-y", `${newPosPercent - posPercent}px`)
    }

    mainSite.on("scroll", () => {
        reposition()
    })
})