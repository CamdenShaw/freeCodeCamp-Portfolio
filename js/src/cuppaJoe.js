$(document).ready(() => {
    let currentCarousel, view

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

    function setSrc(source) {
        if (source === "web app") {
            $(".mars-colony-frame").attr("src", "https://camdenshaw.github.io/Project-5/")
            $(".weather-app-frame").attr(
                "src",
                "https://camdenshaw.github.io/weather-app/"
            )
            $(".note-dot-js-frame").attr("src", "https://note-dot-js.herokuapp.com")
            $(".pong-frame").attr("src", "https://camdenshaw.github.io/Pong/")
        }
        if (source === "wordpress") {
            $(".vatjss-frame").attr("src", "http://vatjssportfolio.herokuapp.com")
            $(".inhabitent-frame").attr("src", "http://inhabi-tent.herokuapp.com/")
        }
        if (source === "single page") {
            $(".aloha-frame").attr("src", "https://camdenshaw.github.io/Aloha/")
            $(".wu-zetian-frame").attr(
                "src",
                "https://camdenshaw.github.io/Wu-Zetian-Tribute-freeCodeCamp/"
            )
            $(".instanews-frame").attr("src", "https://camdenshaw.github.io/Instanews/")
        }
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

        view = $(this.hash)[0].offsetTop

        $(".main-site").animate(
            {
                scrollTop: view
            },
            300
        )
    })

    $(window).ready(() => {
        forceBox()
    })

    $("a.web-app-open").click(e => {
        $(`#${e.currentTarget.nextElementSibling.id} iframe`)[0].attributes.src.value ===
            "about:blank" && setSrc("web app")
    })
    $("a.wordpress-open").click(e => {
        $(`#${e.currentTarget.nextElementSibling.id} iframe`)[0].attributes.src.value ===
            "about:blank" && setSrc("wordpress")
    })
    $("a.single-page-open").click(e => {
        $(`#${e.currentTarget.nextElementSibling.id} iframe`)[0].attributes.src.value ===
            "about:blank" && setSrc("single page")
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

    $("i.fa.fa-info-circle").click(e => {
        let showElement = e.target.parentElement.nextElementSibling.className.split(" ").join(".")
        $(`div.${showElement}`).toggleClass("show-info")
    })

    $("form.message-camden").on("submit", e => {
        e.preventDefault()
        alert("The form is not yet connected to the server, ", "<a href=mailto:camden.shaw@gmail.com>camden.shaw@gmail.com</a>", " click the link to get a hold of Camden.")
    })

    console.log(navigator.userAgent.toLowerCase().search())

    window.addEventListener("resize", () => {
        forceBox()
    })
})
