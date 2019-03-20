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

    let d = $(".experiment path")[0].getAttribute('d')

    d = calcPath(d)

    $(window).on('load', () => {
        $(".circle").css({
            motionPath: `path('${d}')`,
            offsetPath: `path('${d}')`,
            motionPosition: "100%",
            offsetPosition: "100%",
        })
    })
})

$(window).on('resize', () => {
    let d
    setTimeout(() => {
        d = $(".experiment path")[0].getAttribute('d')

        d = calcPath(d)
    }, 1)

    setTimeout(()=>{
        $(".circle").css({
            motionPath: `path('${d}')`,
            offsetPath: `path('${d}')`,
            motionPosition: "100%",
            offsetPosition: "100%",
        })
    }, 2)
})

function calcPath(d) {

    console.log('d: ', d)

    let toCalc = d.split(/e-\d\d/)
    
    toCalc = toCalc.join('')
    console.log(toCalc);
    toCalc = toCalc.split(/([A-Za-z])/)
    
    toCalc.forEach((section, key) => {
        let temp = parseInt(section)
        console.log(temp, isNaN(temp))

        if(!isNaN(temp)) {
            let temp2 = section.split(',')

            temp2.forEach((section2, key2) => {
                let temp3 = parseInt(section2)

                if(!isNaN(temp3)) {
                    let temp4 = section2.split(' ')

                    temp4.forEach((section3, key3) => {
                        let temp5 = parseInt(section3)

                        if(!isNaN(temp5)) {
                            temp4[key3] = (window.outerWidth / 1200) * temp5
                        }
                    })
                    temp2[key2] = temp4.join(' ')
                }
            })
            toCalc[key] = temp2.join(',')
        }
    })

    console.log('to calc:', toCalc);

    d = toCalc.join(' ').toString()

    console.log('d: ', d)

    return d
}