// menu
class MobileNavBar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
              ?(link.style.animation = "")
              :(link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3 }s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
        this.navList.addEventListener("click", () => {
                this.navList.classList.remove(this.activeClass);
                this.mobileMenu.classList.remove(this.activeClass);
                this.animateLinks();
        });
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavBar = new MobileNavBar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li"
);
mobileNavBar.init();

// Scrowll Down reveal
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for(var i = 0; i< reveals.length; i++) {

        var windowheigth = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheigth - revealpoint) {
            reveals[i].classList.add('active');
        }
        else {
            reveals[i].classList.remove('active');
        }
    }
}

// Form
const form = document.getElementById('form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const nomeValue = nome.value;
    const emailValue = email.value;
    const telefoneValue = telefone.value;

    if (nomeValue === "") {
        setErrorFor(nome, "Nome obrigatório.");
    } else {
        setSuccessFor(nome);
    }

    if (emailValue === "") {
        setErrorFor(email, "Email obrigatório.");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Por favor, insira um e-mail válido.");
    } else {
        setSuccessFor(email);
    }

    if (telefoneValue === "") {
        setErrorFor(telefone, "Telefone obrigatório.");
    } else {
        setSuccessFor(telefone);
    }
}

function setErrorFor (input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    //adicionar menssagem de erro
    small.innerText = message;

    //adicionar classe de erro
    formControl.className = 'form-control error';
}

function setSuccessFor (input) {
    const formControl = input.parentElement;

    //adicionar a classe de sucesso
    formControl.className = 'form-control success';
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }