$(document).ready(() => {
    const forceBox = () => {
        console.log("forcebox")
        let image = $("img")
        let i = 0
        console.log(image)
        do {
            console.log(image[i], i)
            console.log(image[i].height)
            console.log($(image[i]).css("height"))
            if (
                image[i + 1].height < image[i].height ||
                image[i].height < image[i + 1].height
            ) {
                $(image[i]).css("max-height", image[i + 1].height - 2)
                $(image[i]).css("width", "auto")
                $(image[i + 1]).css("height", `${$(image[i]).css("auto")}`)
                $(image[i + 1]).css("width", `100%`)
            }
            i = i + 2
        } while (i < image.length - 1)
    }
    console.log("cuppaJoe.js is loaded with jQuery")
    window.addEventListener("resize", () => {
        forceBox()
    })
    forceBox()
})