$(document).ready(() => {
    let fake, from, email, subject, formContent, messageContent, toggleData;
    const to = "camden.shaw@gmail.com",
        submitMessageStart = parseFloat($(".submit-message").css("marginBottom"))

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
    
    $("form.message-camden").on("submit", (e) => {
        e.preventDefault()
        email = $("[name='realsies']").val()
        fake = $("[name='email']").val()
        from = $("[name='from']").val()
        subject = `Message From ${from} Via camdenshaw.ca`
        formContent = $("[name='content']").val()
        messageContent = `${formContent}\n\n${from}\n${$("[name='phone#']").val()}\n${email}`
        
        if(fake !== undefined && fake !== '') {
            $(".status").empty().html("Go Away Bots!")
            toggleTheClass("warning")

            setTimeout(function() {
                window.location = "https://google.com"
            }, 100)
            return
        }

        if(formContent === undefined || formContent === '') {
            $(".status").empty().html("Camden wants a message - bare minimum")
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