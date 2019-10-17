$(document).ready(() => {
    let currentCarousel, view,
        os = window.navigator.platform

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

        $("html, body, .main-site").animate(
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
                $(car).addClass(`${i} coming-soon-wrapper`)
                const comingSoon = "<div class='coming-soon'><h3>Coming Soon</h3></div>"
                car.innerHTML = `${car.innerHTML}${comingSoon}`
            }
            i++
        })
        inProgress()
        $(".main-site").scrollspy({
            spy: "scroll",
            target: "#navbar",
            offset: 140
        })
    })

    $("i.fa.fa-info-circle").click(e => {
        let showElement = e.target.parentElement.nextElementSibling.className.split(" ").join(".")
        $(`div.${showElement}`).toggleClass("show-info")
    })

    if (os === "Android" || os === "Linux" || os === null || os === "Linux aarch64" || os === "Linux armv5tejl" || os === "Linux armv6l" || os === "Linux armv7l" || os === "Linux i686" || os === "Linux i686 on x86_64" || os === "Linux i686 X11" || os === "Linux MSM8960_v3.2.1.1_N_R069_Rev:18" || os === "Linux ppc64" || os === "Linux x86_64" || os === "Linux x86_64 X11") {
        // console.log("android ", os)
        $(".android-download").css("display", "block")
     } else if (os === "iPhone" || os === "iPod" || os === "iPad" || os === "iPhone Simulator" || os === "iPod Simulator" || os === "iPad Simulator" || os === "Pike v7.6 release 92" || os === "Pike v7.8 release 517") {
        //  console.log("iOS handheld", os)
         $(".android-download").css("display", "none")
     } else {
        //  console.log("not handheld device", os)
     }

    window.addEventListener("resize", () => {
        forceBox()
    })
})
