$(document).ready(() => {
    let offset = 100

    const forceBox = () => {
        let image = $("img")
        let i = 0

        do {
            if (image[i].height > image[i].width) {
                if (i % 2 === 0) {
                    $(image[i + 1]).css("height", `${$(image[i]).css("auto")}`)
                }
                $(image[i + 1]).css("width", `100%`)
                $(image[i]).css("height", image[i + 1].height - 1)
                $(image[i]).css("width", "auto")
            }
            i++
        } while (i < image.length - 1)
    }

    const setSrc = () => {
        $(".mars-colony-frame").attr("src", "https://camdenshaw.github.io/Project-5/")
        $(".weather-app-frame").attr("src", "https://camdenshaw.github.io/weather-app/")
        $(".note-dot-js-frame").attr("src", "https://note-dot-js.herokuapp.com")
        $(".pong-frame").attr("src", "https://camdenshaw.github.io/Pong/")
        $(".vatjss-frame").attr("src", "http://vatjssportfolio.herokuapp.com")
        $(".inhabitent-frame").attr("src", "http://inhabi-tent.herokuapp.com/")
        $(".aloha-frame").attr("src", "https://camdenshaw.github.io/Aloha/")
        $(".instanews-frame").attr("src", "https://camdenshaw.github.io/Instanews/")
        $(".wu-zetian-frame").attr(
            "src",
            "https://camdenshaw.github.io/Wu-Zetian-Tribute-freeCodeCamp/"
        )
    }

    const inProgress = () => {
        $(".in-progress").wrap('<div class="block"></div>')
        $(".block").ready(() => $(".block").append("<h3>In Progress</h3>"))
    }

    $(".carousel").carousel({
        pause: "hover",
        interval: 7000,
        wrap: true,
        keyboard: true
    })

    $(".navbar li a").click(function(event) {
        event.preventDefault()
        $($(this).attr("href"))[0]
            .scrollIntoView({ behavior: "smooth" })
            .scrollBy(0, -offset)
    })

    $(window).ready(() => {
        forceBox()
    })

    $(".early-success").ready(() => {
        setTimeout(setSrc(), 100)
    })

    $(".main-site").ready(() => {
        let carousel = $(".car")
        let i = 1
        Object.values(carousel).forEach(car => {
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
        inProgress()
        $(".main-site").scrollSpy({
            spy: "scroll",
            target: "#myNavbar",
            offset: 140
        })
    })

    window.addEventListener("resize", () => {
        forceBox()
    })
})
