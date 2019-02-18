$(document).ready(() => {

    $('select').formSelect()

    $('.collapsible').collapsible();

    $('input#value').mask('####.##0000,00', {
        reverse: true
    })

    $('.select-wrapper ul li').on('click',event => {
        $('input.select-dropdown').addClass('border-selected')
    })

    $('form').on('submit', event => {
        event.preventDefault()

        console.log($(event.target.nextElementSibling));
        

        showMessage = text => {
            console.log(text);
            
            $(event.target.nextElementSibling.children['text']).html(text)
            $(event.target.nextElementSibling).removeClass('hide')
            $(event.target).addClass('hide')
        }

        $.post(location.href, $(event.target).serialize())
            .done(data => showMessage(data))
            .fail(err => showMessage(err.responseText))

    })
})