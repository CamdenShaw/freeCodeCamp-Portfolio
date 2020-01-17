$(document).ready(() => {
    let from, froms, email, emails, phone, phones, subject, subjects, formContent, formContents, messageContent, toggleData, formElementsAfter, submit, submits,
        z = false
    const to = "camden.shaw@gmail.com",
        submitMessageStart = parseFloat($(".submit-message").css("marginBottom")),
        formElementNames = ['from', 'email', 'phone#', 'content']

    const abcDEF = (elementArray) => {
        let randomInt = Math.random(0, 1),
            selectKey = Math.round(randomInt),
            style = { display: 'initial'},
            style1 = {
                ...style,
                opacity: 0,
                height: 0,
                margin: 0,
                padding: 0,
                border: 0
            },
            style2 = {
                ...style,
                opacity: 1,
            }

        elementArray.each((key, element) => {
            if ( key === selectKey ) {
                Object.assign(element.style, style1)
            } else {
                Object.assign(element.style, style2)
            }
        })

        return selectKey + 1
    }

    const awayWithBots = () => {
        formElementNames.forEach((name) => {
            let a = abcDEF($(`form.message-camden [name='${name}']`))
            formElementsAfter[name] = {
                a: a - 1,
                b: 2 - a
            }
        })
        
        let a = abcDEF($('form.message-camden [type="submit"]'))
        formElementsAfter.button = {
            a: a - 1,
            b: 2 - a
        }
    }

    setTimeout(() => {
        formElementsAfter = {}
        awayWithBots()
    }, 500)

    const formButtonMargin = () => {
        if($(".status")[0].classList.length === 1) {
            if(parseFloat($(".submit-message").css("marginBottom")) === submitMessageStart - parseFloat($(".status").css("fontSize"))){
                $(".submit-message").css("marginBottom", 30)
            }
        }
        else {
            $(".submit-message").css("marginBottom", submitMessageStart - parseFloat($(".status").css("fontSize")))
        }
    }

    const toggleTheClass = (classToToggle) => {
        $(".status").toggleClass(`${classToToggle}`)
    }
    
    $("form.message-camden").on("submit", function(e) {
        e.preventDefault()

        submits = $("[type='submit']")

        if ( this === submits[formElementsAfter.button.a]) {
            console.log('button logic is wrong')
            z = true
        }

        if ( !z && typeof formElementsAfter === 'object' && formElementsAfter !== null ) {
            emails = $("[name='email']")
            froms = $("[name='from']")
            formContents = $("[name='content']")
            phones = $("[name='phone#']")

            console.log(emails)

            console.log(formElementsAfter)

            console.log(formElementsAfter.email)

            console.log($(emails[formElementsAfter.email.a]).val())

            if ( $(emails[formElementsAfter.email.a]).val() !== '') {
                console.log('email logic is wrong')
            }
            if ( $(froms[formElementsAfter.from.a]).val() !== '') {
                console.log('from logic is wrong')
            }
            if ( $(formContents[formElementsAfter.content.a]).val() !== '') {
                console.log('content logic is wrong')
            }
            if ( $(phones[formElementsAfter['phone#'].a]).val() !== '') {
                console.log('phone logic is wrong')
            }

            if ( $(emails[formElementsAfter.email.a]).val() !== ''
                || $(froms[formElementsAfter.from.a]).val() !== ''
                || $(formContents[formElementsAfter.content.a]).val() !== ''
                || $(phones[formElementsAfter['phone#'].a]).val() !== ''
            ) {
                z = true
            } else {
                email = $(emails[formElementsAfter.email.b]).val()
                from = $(froms[formElementsAfter.email.b]).val()
                subject = `Message From ${from} Via camdenshaw.ca`
                formContent = $(formContents[formElementsAfter.content.b]).val()
                phone = $(phones[formElementsAfter['phone#'].b]).val()
                messageContent = `${formContent}\n\n${from}\n${phone}\n${email}`
            }
        } else {
            console.log('this logic is wrong')
            z = true
        }
        
        if ( typeof z !== 'undefined' && z !== '' && z ) {
            $(".status").empty().html("Go Away Bots!")
            toggleTheClass("warning")

            setTimeout(function() {
                window.location = "https://google.com"
            }, 100)
            return
        }

        if(formContent === undefined || formContent === '') {
            $(".status").empty().html("This form is here to initiate dialogue, so please write a message.")
            toggleTheClass("warning")
            return
        } else if($(".status").hasClass("warning")) {
            toggleTheClass("warning")
        }
        
        $(".status").empty().html("Sending Email")
        toggleTheClass("sending")
        formButtonMargin()
        
        let noResponse = setTimeout(() => {
            clearInterval(waitingForResponse)
            clearInterval(clearDots)
            $(".status").html($(".status").html().replace(/\./g, ""))
            toggleTheClass("sending")
            toggleTheClass("warning")
            $(".status").text() === "Sending Email" && $(".status").empty().html("No Response on Message Status")
            formButtonMargin()
        }, 40000)
        
        let waitingForResponse = setInterval(() => $(".status").append("."), 200)
        let clearDots = setInterval(() => $(".status").html($(".status").html().replace(/\./g, "")), 2000)

        $.get("https://camden-portfolio.herokuapp.com/send", {
            from,
            to,
            subject,
            messageContent
        }, (data, err) => {
            clearInterval(waitingForResponse)
            clearInterval(clearDots)
            clearTimeout(noResponse)
            toggleTheClass("sending")
            toggleTheClass(data)
            data==="sent" && $(".status").empty().html(`Email has been sent.`)
            data==="error" && $(".status").empty().html(`An error has occurred, please try again later. <i class="mail fa fa-info-circle></i></p><p class="mail-error">${err}`)
            toggleData = setTimeout(() => toggleTheClass(data), 50000)
            formButtonMargin()
        })
        
        const clearStatus = (toggleClass) => {
            clearInterval(waitingForResponse)
            clearInterval(clearDots)
            toggleTheClass(toggleClass)
            formButtonMargin()
            clearInterval(clearSent)
        }

        let clearSent = setInterval(() => {
            if($(".status")[0].classList[1] === "sent") {
                clearTimeout(clearStatusMessage)
                clearTimeout(toggleData)
                setTimeout(() => clearStatus($(".status")[0].classList[1]), 5000)
                clearInterval(clearSent)
            }
        }, 100)

        let clearStatusMessage = setTimeout(() => {
            clearStatus($(".status")[0].classList[1])
        }, 50000)

    })
})