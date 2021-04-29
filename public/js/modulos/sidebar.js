const listGroupItem = document.querySelectorAll('.list-group .list-group-item a');

// Activar navegacion
listGroupItem.forEach(item => {

  const href = item.href.split('/');
  const itemHref = href[ href.length - 1 ];
  const path = window.location.pathname.split('/')[2];
  if ( path === itemHref ) item.classList.add('active');

});

export default listGroupItem;
