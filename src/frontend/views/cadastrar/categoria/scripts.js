$(document).ready(() => {

    $('form').on('submit', event => {
        event.preventDefault()

        showMessage = text => {
            $('#result-msg #text').html(text)
            $('#result-msg').removeClass('hide')
            $('form').addClass('hide')
        }

        $.post(location.href, $('form').serialize())
            .done(data => showMessage(data))
            .fail(err => showMessage(err))


    })
})