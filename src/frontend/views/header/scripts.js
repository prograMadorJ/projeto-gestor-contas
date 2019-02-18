$(document).ready(function () {

  $('.sidenav').sidenav();

  $('.collapsible').collapsible();

  $('#opc-menu li').each((i, opc) => {
    if ($('title').attr('data-opc') == $(opc).attr('data-opc')) {
      $(opc.children['subopc-add']).removeClass('hide');
      return $(opc).addClass('active-opc')
    }
  })

  $('#opc-menu li').each((i, opc) => {
    $(opc).on('click', event => {
      console.log(event.target.innerText);
      if (!event.target.innerText.includes('Compras')) $('a#subopc-add').addClass('hide')
      if ($('title').attr('data-opc') == $(opc).attr('data-opc')) {
        $(event.target.nextElementSibling).toggleClass('hide')
      }
    })
  })
});