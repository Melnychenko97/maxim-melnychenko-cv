"use strict";
console.log(window.location.pathname);
if (window.location.pathname === '/') {
    const homeLink = document.querySelector('#home');
    homeLink.classList.add('bg-blue-300');
}

const closeMenu = document.querySelector('#close-menu');
const mobMenu = document.querySelector('#mob-menu');

closeMenu.addEventListener('click', (e) => {
    e.preventDefault();
    mobMenu.classList.remove('hidden');
});

const openMenu = document.querySelector('#hamburger');

openMenu.addEventListener('click', (e) => {
    e.preventDefault();
    mobMenu.classList.remove('hidden');
});

closeMenu.addEventListener('click', (e) => {
    e.preventDefault();
    const navigation = document.querySelector('#navigation');
    mobMenu.classList.add('hidden');
});

mobMenu.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('nav__item')) {
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach( (item) => item.classList.remove('bg-blue-300') );
        e.currentTarget.classList.add('hidden');
        const name = e.target.getAttribute('id');
        navigateTo(e.target, name);
    }

})

const navigateTo = (pageLink, pageName) => {
    const loader = document.querySelector('#loader');
    loader.classList.remove('hidden');
    pageLink.classList.add('bg-blue-300');
    const app = document.querySelector('#app');
    fetch(`./components/${ pageName + '' }.html`, {
        method: 'GET',
    })
        .then(resolve => resolve.text())
        .then(result => app.innerHTML = result)
        .then(() => loader.classList.add('hidden'))
        .catch(err => console.log(err));
}