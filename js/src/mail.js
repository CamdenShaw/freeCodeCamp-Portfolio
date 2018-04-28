$(document).ready(() => {
    let from, subject, text;
    const to = "camden.shaw@gmail.com",
        submitMessageStart = parseFloat($(".submit-message").css("marginBottom"))

    const formButtonMargin = () => {
        if($(".status").html() === "" && parseFloat($(".submit-message").css("marginBottom")) === submitMessageStart - parseFloat($(".status").css("fontSize"))) {
            $(".submit-message").css("marginBottom", 30)
            $(".status").css("height", 0)
        }
        else {
            $(".submit-message").css("marginBottom", submitMessageStart - parseFloat($(".status").css("fontSize")))
            $(".status").css("height", "100%")
        }
    }

    const toggleTheClass = (classToToggle) => {
        $(".status").toggleClass(`${classToToggle}`)
    }
    
    $("form.message-camden").on("submit", (e) => {
        e.preventDefault()
        from = $("[name='from']").val()
        subject = `Message From ${from} Via camdenshaw.ca`
        text = `${$("[name='content']").val()}\n\n${from}\n${$("[name='phone#']").val()}\n${$("[name='email']").val()}`
        $(".status").html("Sending Email")
        formButtonMargin()
        let noResponse = setTimeout(() => {
            $(".status").toggleClass("warning").text() === "Sending Email" && $(".status").html("No Response on Message Status")
            formButtonMargin()
        }, 40000)
        $.get("https://camden-portfolio.herokuapp.com/send", {
            from,
            to,
            subject,
            text
        }, (data, err) => {
            clearTimeout(noResponse)
            data=="sent" && $(".status").toggleClass(data).empty().html(`Email has been </p><p>sent.`)
            data=="error" && $(".status").toggleClass(data).empty().html(`An error has occurred, please try again later. <i class="mail fa fa-info-circle></i></p><p class="mail-error">${err}`)
            toggleTheClass(data)
            formButtonMargin()
        })
        setTimeout(() => {
            $(".status")[0].classList[1] === "warning" && toggleTheClass("warning")
            $(".status").empty()
            formButtonMargin()
        }, 50000)
    })
})