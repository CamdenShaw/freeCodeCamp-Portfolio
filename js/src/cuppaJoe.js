$(document).ready(() => {
    $("iframe")
        .mouseenter(() => {
            $(".carousel").carousel({
                pause: true,
                interval: false
            })
        })
        .mouseleave(() => {
            $(".carousel").carousel({
                pause: false,
                interval: true
            })
        })

    const forceBox = () => {
        let image = $("img")
        let i = 0
        do {
            if (image[i].height > image[i].width) {
                $(image[i]).css("max-height", image[i + 1].height - 2)
                $(image[i]).css("width", "auto")
                if (i % 2 === 0) {
                    $(image[i + 1]).css("height", `${$(image[i]).css("auto")}`)
                }
                $(image[i + 1]).css("width", `100%`)
            }
            i++
        } while (i < image.length - 1)
    }
    window.addEventListener("resize", () => {
        forceBox()
    })
    $(window).on("load", forceBox())
})
