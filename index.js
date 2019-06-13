"use strict";
const loader = $('#loader');
const address = window.location.origin;
const initialLink = window.location.href;
const pageId = initialLink.split('/#')[1]; //current page position

const credentials = () => {
    const diplomas = document.querySelector('[data-id="diplomas"]');
    const certificates = document.querySelector('[data-id="certificates"]');

    const openList = (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const item = document.querySelector('#' + id);
        for ( let i = 0; i < e.currentTarget.children.length; i++ ) {
            e.currentTarget.children[i].classList.contains('arrow') ? e.currentTarget.children[i].classList.toggle('hidden') : null;
        }
        $(item).slideToggle(500);
    }

    diplomas.addEventListener('click', openList );
    certificates.addEventListener('click', openList );
}

const navigateTo = ( pageLink , pageName, goBack) => {
    pageLink = $(pageLink);
    const loader = document.querySelector('#loader');
    $(loader).show();
    $(pageLink).addClass('bg-blue-300');
    const app = document.querySelector('#app');
    fetch(`./components/${ pageName + '' }.html`, {
        method: 'GET',
    })
        .then(resolve => resolve.text())
        .then(result => app.innerHTML = result)
        .then(() => {
            !goBack ? history.pushState({pageName}, ``, `.#${pageName}`): null;
            setTimeout(() =>  $(loader).fadeOut(400), 800 );
            switch (pageName) {
                case 'credentials' :
                    credentials();
                    break;
                default :
                    null;
            }
        })
        .catch(err => console.error(err));
}

window.addEventListener('popstate', e => {
    if (e.state !== null) {
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach( (item) => item.classList.remove('bg-blue-300') );
        navigateTo($(`#${e.state.pageName}`), e.state.pageName, true);

    }
})

fetch( pageId && pageId.length > 0 ? `./components/${pageId}.html` :`./components/general.html`, {
    method: 'GET',
})
    .then(resolve => resolve.text())
    .then(result => app.innerHTML = result)
    .then(() => {
        const pageName = pageId && pageId.length > 0 ? pageId : 'general';
        history.pushState( {pageName}, ``, `.#${pageId && pageId.length > 0 ? pageId : 'general'}`);
        switch (pageName) {
            case 'credentials' :
                credentials();
                break;
            default :
                null;
        }
                $(`#${pageName}`).addClass('bg-blue-300');
                setTimeout(() =>  $(loader).fadeOut(400), 800 );
    })
    .then(() => {
        const closeMenu = document.querySelector('#close-menu');
        const mobMenu = document.querySelector('#mob-menu');

        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobMenu.classList.remove('hidden');
            $('#id').show();
        });

        const openMenu = document.querySelector('#hamburger');

        openMenu.addEventListener('click', (e) => {
            e.preventDefault();
            mobMenu.classList.remove('hidden');
            $('#app').hide();
        });

        closeMenu.addEventListener('click', (e) => {
            e.preventDefault();
            const navigation = document.querySelector('#navigation');
            mobMenu.classList.add('hidden');
            $('#app').show();

        });

        const nav = document.querySelector('nav');

        nav.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('nav__item')) {
                const navItems = document.querySelectorAll('.nav__item');
                navItems.forEach( (item) => item.classList.remove('bg-blue-300') );
                mobMenu.classList.add('hidden');
                let name = e.target.getAttribute('id');
                const nextLink = (name === 'general-name') ? $('#general') : e.target;
                name === 'general-name' ? name = 'general' : name = name;

                $('#app').show();
                navigateTo(nextLink, name, false);
            }
        })
    })
    .catch(err => console.error(err));