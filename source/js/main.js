
let mainNav = document.querySelector('.main-nav');
let mainNavToggle = document.querySelector('.main-nav__toggle');
let orderButton = document.querySelector('.weekly-product__order');
let addToCartButton = document.querySelector('.modal-cart__add');

// Cancel display without JS
mainNav.classList.remove('main-nav--no-js');

// Open/close Menu when button clicked
mainNavToggle.addEventListener('click', ev => {
  if (mainNav.classList.contains('main-nav--closed'))
    mainNav.classList.remove('main-nav--closed');
  else mainNav.classList.add('main-nav--closed');
});

// Show Modal
orderButton.addEventListener('click', showModalCart);

function showModalCart(ev) {
  let modalCart = document.querySelector('.modal-cart');
  let modalOverlay = document.querySelector('.modal-overlay');
  modalCart.classList.toggle('visually-hidden');
  modalOverlay.classList.toggle('visually-hidden');
  modalCart.style.opacity = '1';
  modalOverlay.style.opacity = '1';
}

// Hide Modal
addToCartButton.addEventListener('click', hideModalCart);

function hideModalCart(ev) {
  let modalCart = document.querySelector('.modal-cart');
  let modalOverlay = document.querySelector('.modal-overlay');
  modalCart.classList.add('visually-hidden');
  modalOverlay.classList.add('visually-hidden');
  modalCart.style.opacity = '0';
  modalOverlay.style.opacity = '0';
}

