const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
}


if (isMobile.any()) {
    document.body.classList.add('_touch');
} else {
    document.body.classList.add('_pc'); 
}




const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
    const menuBody = document.querySelector('.menu__body');
    iconMenu.addEventListener("click", function (e){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    })
}


// Data
// "../assets/src/products.json"

fetch('/assets/src/products.json')
.then(response => response.json())
.then(products => {
    localStorage.setItem("products", JSON.stringify(products))
})

let container = document.querySelector(".produkty__content");
let loadMoreButton = document.querySelector(".produkty__content button");
let box = document.querySelector('.produkty__box')

let initialItems = 4;
let loadItems = 4;


function loadInitialItems() {
    let products = JSON.parse(localStorage.getItem("products"));
    let out = "";
    let counter = 0;
    for(let product of products){
        if(counter < initialItems){
            out += `
                    <div class="produkty__item">
                        <div class="produkty__flags">
                            <p class="produkty__flag produkty__flag_1">${product.flags}</p>
                            <p class="produkty__flag produkty__flag_2">${product.flags}</p>
                        </div>
                        <div class="produkty__imgBox">
                            <img src="${product.imgSrc}" alt="2" class="produkty__img produkty__img_1">
                        </div>
                        <a href="#" class="produkty__text">
                            ${product.title}
                        </a>
                        <div class="produkty__down-card">
                            <div class="produkty__the-down-card">
                                <p class="produkty__dispozice">
                                    ${product.availability}
                                </p>
                                <p class="produkty__cena">
                                    ${product.price} CZK
                                </p>
                            </div>
                            <button class="produkty__add-to">
                                <a href="#">
                                    <img src="/assets/img/shoppingCart.svg" alt="shoppingCart" class="produkty__add-to_icon">
                                </a>
                            </button>
                        </div>
                    </div>
            `;
        }
        counter++;
    }

    // let div = document.createElement("div");
    // container.insertBefore(div, loadMoreButton);
    box.innerHTML = out;
}


function loadData(){
    let products = JSON.parse(localStorage.getItem("products"));
    let currentDisplayedItems = document.querySelectorAll(".product").length;

    let out = "";
    let counter = 0;
    for(let product of products){
        if(counter >= currentDisplayedItems && counter < loadItems + currentDisplayedItems){
            out += `
                <div class="produkty__item">
                <div class="produkty__flags">
                    <p class="produkty__flag produkty__flag_1">${product.flags}</p>
                    <p class="produkty__flag produkty__flag_2">${product.flags}</p>
                </div>
                <div class="produkty__imgBox">
                    <img src="${product.imgSrc}" alt="2" class="produkty__img produkty__img_1">
                </div>
                <a href="#" class="produkty__text">
                    ${product.title}
                </a>
                <div class="produkty__down-card">
                    <div class="produkty__the-down-card">
                        <p class="produkty__dispozice">
                            ${product.availability}
                        </p>
                        <p class="produkty__cena">
                            ${product.price} CZK
                        </p>
                    </div>
                    <button class="produkty__add-to">
                        <a href="#">
                            <img src="/assets/img/shoppingCart.svg" alt="shoppingCart" class="produkty__add-to_icon">
                        </a>
                    </button>
                </div>
            </div>
            `;
        }
        counter++;
    }

    // let div = document.createElement("div");
    // container.insertBefore(div, loadMoreButton);
    box.innerHTML = out;
    // div.style.opacity = 0;


    if(document.querySelectorAll(".product").length == products.length){
        loadMoreButton.style.display = "none"
    }

    fadeIn();
}


function fadeIn(div){
    let opacity = 0;
    let interval = setInterval(function(){
        if (opacity <= 1) {
            opacity = opacity + 0.1;
            div.style.opacity = opacity;
        }else{
            clearInterval(interval);
        }
    }, 30);
}

