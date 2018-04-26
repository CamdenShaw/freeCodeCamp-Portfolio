$(document).ready(() => {
    let from, subject, text;
    const to = "camden.shaw@gmail.com"

    $("form.message-camden").on("submit", (e) => {
        e.preventDefault()
        from = $("[name='from']").val()
        subject = `Message From ${from} Via camdenshaw.ca`
        text = `${$("[name='content']").val()}\n\n${from}\n${$("[name='phone#']").val()}\n${$("[name='email']").val()}`
        $(".status").text("Sending Email")
        $.get("camdenshaw.ca:3010/send", {
            from,
            to,
            subject,
            text
        }, (data) => {
            data=="sent" && $(".status").empty().html("Email has been sent.")
            data=="error" && $(".status").empty().html("An error has occurred, please try again later.")
            setTimeout(()=> $(".status").empty(), 10000)
        })
    })
})