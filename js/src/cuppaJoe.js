$(document).ready(() => {
    console.log("document is ready")
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

    const setSrc = () => {
        $(".mars-colony-frame").attr("src", "https://camdenshaw.github.io/Project-5/")
        $(".note-dot-js-frame").attr("src", "https://note-dot-js.herokuapp.com")
        $(".pong-frame").attr("src", "https://camdenshaw.github.io/Pong/")
        $(".vatjss-frame").attr("https://vatjssportfolio.herokuapp.com")
        $(".aloha-frame").attr("https://camdenshaw.github.io/Aloha/")
        $(".instanews-frame").attr("https://camdenshaw.github.io/Instanews/")
        $(".wu-zetian-frame").attr(
            "src",
            "https://camdenshaw.github.io/Wu-Zetian-Tribute-freeCodeCamp/"
        )
    }

    $(window).ready(() => {
        console.log("window is ready")
        forceBox()
    })

    $(".early-success").ready(() => {
        console.log("last image is ready")
        setSrc()
        //mute pong somehow
    })

    $(".main-site").ready(() => {
        console.log("main site is ready")
        let carousel = $(".car")
        let i = 1
        Object.values(carousel).forEach(car => {
            console.log(car, carousel[carousel.length - 2])
            if (car === carousel.length) {
                return
            }
            if (!$(car.children[0]).is("a")) {
                $(car).addClass(`${i}`)
                const comingSoon = "<div class='coming-soon'><h3>Coming Soon</h3></div>"
                car.innerHTML = `${car.innerHTML}${comingSoon}`
            }
            i++
        })
    })

    window.addEventListener("resize", () => {
        forceBox()
    })

    $("iframe")
        .mouseenter(() => {
            console.log("enter")
            $(".carousel").carousel({
                pause: true,
                interval: false
            })
        })
        .mouseleave(() => {
            console.log("leave")
            $(".carousel").carousel({
                pause: false,
                interval: true
            })
        })
})
