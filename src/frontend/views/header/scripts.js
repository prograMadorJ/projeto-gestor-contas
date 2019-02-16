$(document).ready(function () {

  $('.sidenav').sidenav();

  $('.collapsible').collapsible();

  $('#opc-menu li').each((i, opc) => {
    if ($('title').attr('data-opc') == $(opc).attr('data-opc')) {
      $(opc.children['subopc-add']).removeClass('hide');
      return $(opc).addClass('active')
    }
  })

  $('#opc-menu li').each((i, opc) => {
    $(opc).on('click', event => {
      $('#subopc-add').addClass('hide')
    })
  })
});