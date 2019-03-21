$(document).ready(() => {
    const mainSite = $(".main-site"),
        totalContentHeight = mainSite[0].scrollHeight

    const reposition = () => {
        let posPercent = 100,
            newPosition = mainSite[0].scrollTop * 10,
            newPosPercent = newPosition / totalContentHeight * -100
        mainSite.css("background-position", `0 ${newPosPercent - posPercent}px`)
    }

    mainSite.on("scroll", () => {
        reposition()
    })
})