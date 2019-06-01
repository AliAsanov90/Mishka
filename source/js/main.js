
let mainNav = document.querySelector('.main-nav');
let mainNavToggle = document.querySelector('.main-nav__toggle');
let orderButton = document.querySelector('.weekly-product__order');
let cartButtons = document.querySelectorAll('.product__price');
let addToCartButton = document.querySelector('.modal-cart__add');
let bodyTag = document.getElementsByTagName('body')[0];
let modalCart = document.querySelector('.modal-cart');
let modalOverlay = document.querySelector('.modal-overlay');


// Cancel display without JS
mainNav.classList.remove('main-nav--no-js');

// Open/close Menu when button clicked
mainNavToggle.addEventListener('click', ev => {
  mainNav.classList.toggle('main-nav--closed');
});

// Show same Modal on different pages
if (bodyTag.id == 'index')
  orderButton.addEventListener('click', showModalCart);
else if (bodyTag.id == 'catalog')
  cartButtons.forEach(button => button.addEventListener('click', showModalCart));


function showModalCart(ev) {
  modalCart.classList.toggle('visually-hidden');
  modalOverlay.classList.toggle('visually-hidden');
  modalCart.style.opacity = '1';
  modalOverlay.style.opacity = '1';
}

// Hide Modal
if (bodyTag.id == 'index' || bodyTag.id == 'catalog') {
  addToCartButton.addEventListener('click', hideModalCart);
  modalOverlay.addEventListener('click', hideModalCart);
}

function hideModalCart(ev) {
  modalCart.classList.add('visually-hidden');
  modalOverlay.classList.add('visually-hidden');
  modalCart.style.opacity = '0';
  modalOverlay.style.opacity = '0';
}

