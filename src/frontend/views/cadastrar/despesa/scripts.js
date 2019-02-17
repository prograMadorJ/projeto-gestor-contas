$(document).ready(() => {

    $('select').formSelect()

    $('input#value').mask('####.##0000,00', {
        reverse: true
    })

    $('.select-wrapper ul li').on('click',event => {
        $('input.select-dropdown').addClass('border-selected')
    })

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