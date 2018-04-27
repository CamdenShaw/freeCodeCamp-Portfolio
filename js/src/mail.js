$(document).ready(() => {
    let from, subject, text;
    const to = "camden.shaw@gmail.com"

    $("form.message-camden").on("submit", (e) => {
        e.preventDefault()
        from = $("[name='from']").val()
        subject = `Message From ${from} Via camdenshaw.ca`
        text = `${$("[name='content']").val()}\n\n${from}\n${$("[name='phone#']").val()}\n${$("[name='email']").val()}`
        $(".status").text("Sending Email")
        setTimeout(() => {$(".status").text() === "Sending Email" && $(".status").text("No Response on Message Status")}, 40000)
        $.get("https://camden-portfolio.herokuapp.com/send", {
            from,
            to,
            subject,
            text
        }, (data, err) => {
            data=="sent" && $(".status").empty().html("Email has been sent.")
            data=="error" && $(".status").empty().html(`<p>An error has occurred, please try again later. <i class="mail fa fa-info-circle></i></p> <p class="mail-error">${err}</p>`)
        })
        setTimeout(()=> $(".status").empty(), 50000)
    })
})