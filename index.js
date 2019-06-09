"use strict";

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

const education = document.querySelector('#education');
const loader = document.querySelector('#loader');

education.addEventListener('click', (e) => {
    e.preventDefault();
    loader.classList.remove('hidden');

    const app = document.querySelector('#app');
    fetch('./components/education.html', {
        method: 'GET',
    })
        .then( resolve => {
            console.log(resolve);
            return resolve.text()
        })
        .then( result =>  app.innerHTML = result )
        .then(() => loader.classList.add('hidden'))
        .catch(err => console.log(err));
});

