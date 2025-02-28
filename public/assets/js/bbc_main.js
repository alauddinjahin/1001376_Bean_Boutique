class BbcMenuToggle {
    constructor(BbcMenuToggleId, navLinksId) {
        this.BbcMenuToggle = document.getElementById(BbcMenuToggleId);
        this.navLinks = document.getElementById(navLinksId);
        this.init();
    }

    init() {
        this.BbcMenuToggle.addEventListener("click", () => {
            this.navLinks.classList.toggle("show");
        });
    }
}


class BbcDiscountBbcModal {
    constructor(BbcModalId, closeBtnClass, signupBtnId) {
        this.BbcModal = document.getElementById(BbcModalId);
        this.closeBtn = document.querySelector(closeBtnClass);
        this.signupBtn = document.getElementById(signupBtnId);
        if(this.BbcModal) this.init();
    }

    init() {
        if (!localStorage.getItem("visited")) {
            setTimeout(() => { this.BbcModal.style.display = "block"; }, 2000);
            localStorage.setItem("visited", "true");
        }

        this.closeBtn.addEventListener("click", () => { 
            this.BbcModal.style.display = "none"; 
        });

        this.signupBtn.addEventListener("click", () => {
            alert("Thank you! Your discount has been applied.");
            this.BbcModal.style.display = "none";
        });
    }
}


class BbcModal {
    constructor(BbcModalId, closeBtnClass, showOnFirstVisit = false) {
        this.BbcModal = document.getElementById(BbcModalId);
        this.closeBtn = document.querySelector(closeBtnClass);
        this.showOnFirstVisit = showOnFirstVisit;
        if(this.BbcModal) this.init();
    }

    init() {

        this.closeBtn.addEventListener("click", () => {
            this.BbcModal.style.display = "none";
        });

        if (this.showOnFirstVisit && !localStorage.getItem("visited")) {
            setTimeout(() => { this.BbcModal.style.display = "block"; }, 2000);
            localStorage.setItem("visited", "true");
        }
    }
}

class BbcProductInteraction {
    constructor(itemClass) {
        this.items = document.querySelectorAll(itemClass);
        if(this.items.length) this.addHoverEffect();
    }

    addHoverEffect() {
        this.items.forEach(item => {
            item.addEventListener("mouseenter", () => {
                item.style.transform = "scale(1.05)";
                item.style.transition = "0.3s ease-in-out";
            });

            item.addEventListener("mouseleave", () => {
                item.style.transform = "scale(1)";
            });
        });
    }
}

class BbcCart {
    constructor(cartItemsContainerId, cartTotalId, checkoutButtonId) {
        this.cartItemsContainer = document.getElementById(cartItemsContainerId);
        this.cartTotal = document.getElementById(cartTotalId);
        this.checkoutButton = document.getElementById(checkoutButtonId);
        if(this.cartItemsContainer){
            this.loadCart();
        }
    }

    generateCartItem(item=null, index=-1){
        
        if(!item &&  typeof item !== "object") return;

        return `
            <img src="${item.image}" alt="${item.name}">
            <div class="bbcs__cart-item-info">
                <h3>${item.name}</h3>
                <p>Price: $${item.price}</p>
            </div>
            <button class="bbcs__remove-btn" data-index="${index}">Remove</button> `;

    }

    loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.cartItemsContainer.innerHTML = "";
        let total = 0;
        const counter = document.querySelector(".bbcs__cart-counter");
        counter.textContent = cart?.length || 0;

        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("bbcs__cart-item");
            cartItem.innerHTML = this.generateCartItem( item, index);
            this.cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        this.cartTotal.innerText = total.toFixed(2);

        document.querySelectorAll(".bbcs__remove-btn").forEach(button => {
            button.addEventListener("click", () => {
                this.removeFromCart(button.getAttribute("data-index"));
            });
        });

        this.checkoutButton.addEventListener("click", () => {
            alert("Checkout feature coming soon!");
        });
    }

    removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.loadCart();
    }
}

class CartActions {
    constructor(addToCartButtonClass) {
        this.addToCartButtons = document.querySelectorAll(addToCartButtonClass);
        this.addToCart();
    }

    getCart(){
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    loadCartCounter(){
        const counter = document.querySelector(".bbcs__cart-counter");
        counter.textContent = this.getCart()?.length || 0;
    }

    addToCart() {
        // console.log(this.addToCartButtons, 'this.addToCartButtons')
        this.addToCartButtons.forEach(button => {
            button.addEventListener("click", () => {
                let name = button.getAttribute("data-name");
                let price = button.getAttribute("data-price");
                let image = button.getAttribute("data-image");
                this.addItemToCart(name, price, image);
            });
        });
    }

    addItemToCart(name, price, image) {
        let cart = this.getCart();
        cart.push({ name, price: parseFloat(price), image });
        localStorage.setItem("cart", JSON.stringify(cart));
        this.loadCartCounter();
        alert(`${name} has been added to your cart!`);
    }
}

class BbcSubscription {
    constructor(subscribeButtonClass, shopNowButtonClass) {
        this.subscribeButtons = document.querySelectorAll(subscribeButtonClass);
        this.shopNowButton = document.querySelector(shopNowButtonClass);

        if(this.subscribeButtons.length)  this.init();
    }

    init() {
        this.subscribeButtons.forEach(button => {
            button.addEventListener("click", () => {
                let plan = button.getAttribute("data-plan");
                alert(`You have selected the ${plan} BbcSubscription Plan! Checkout coming soon.`);
            });
        });

        this.shopNowButton.addEventListener("click", () => {
            window.location.href = "coffee.html";
        });
    }
}

class RegistrationBbcModal {
    constructor(BbcModalId, closeBtnClass, eventNameSelector, registerButtonSelector, formSelector) {
        this.BbcModal = document.getElementById(BbcModalId);
        this.closeBtns = document.querySelectorAll(closeBtnClass);
        this.eventNameElement = document.querySelector(eventNameSelector);
        this.registerButtons = document.querySelectorAll(registerButtonSelector);
        this.registrationForm = document.querySelector(formSelector);
        if(this.BbcModal) this.init();
    }

    init() {
        this.registerButtons.forEach(button => {
            button.addEventListener("click", (event) => this.openBbcModal(event));
        });

        this.closeBtns.forEach(button => {
            button.addEventListener("click", (event) => this.closeBbcModal(event));
        });


        this.registrationForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    openBbcModal(event) {
        const eventName = event.target.getAttribute("data-event");
        this.eventNameElement.innerText = `Register for ${eventName}`;
        this.BbcModal.style.display = "block";
    }

    closeBbcModal() {
        this.BbcModal.style.display = "none";
    }

    handleFormSubmit(event) {
        event.preventDefault();
        alert("Thank you for registering! Check your email for confirmation.");
        this.closeBbcModal();
    }
}



class NavBar{
    constructor(){
        this.navLinks = document.querySelectorAll("header nav #__nav-links a");
    }

    activePath(){
        return window.location.pathname ? window.location.pathname.substr(1) : null;
    }

    activeMenu(){
        let activeElement = null;
        this.navLinks.forEach(link => {
            if(link.getAttribute("href") === this.activePath()){
                activeElement = link;
            }
        })

        activeElement?.classList.add("active");
    }
}

class WishList {
    constructor(elementRef){
        if(elementRef){
            this.elementRef = elementRef;
        }
    }

    static getWishList(){
        return JSON.parse(localStorage.getItem("wishList")) || [];
    }

    static toggleWishList(name, price, image){
        let wishList = WishList.getWishList();
        const itemIndex = wishList.findIndex(item => item.name === name);
        let msg = null;
        if (itemIndex === -1){
            wishList.push({ name, price: parseFloat(price), image });
            msg = `${name} is added to your WishList!`;
        }else{
            wishList = wishList.filter(item => item.name !== name)
            msg = `${name} is removed from your WishList!`;

        }

        localStorage.setItem("wishList", JSON.stringify(wishList));
        alert(msg)
    }

    static addToWishList(){

        document.body.addEventListener("click", function (event) {
            if (event.target.closest(".__which__list")) {
                const button = event.target.closest(".__which__list").parentElement.querySelector(".bbcs__add-to-cart");
                let name = button.getAttribute("data-name");
                let price = button.getAttribute("data-price");
                let image = button.getAttribute("data-image");
                WishList.toggleWishList(name, price, image);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {

    new NavBar().activeMenu();

    new BbcDiscountBbcModal("discount-modal", ".bbcs__close", "signup-btn");
    new BbcMenuToggle("menu-toggle", "__nav-links");
    new BbcModal("discount-modal", ".bbcs__close", true);
    new BbcProductInteraction(".bbcs__coffee-item");
    new BbcProductInteraction(".bbcs__equipment-item");
    const cartActions = new CartActions(".bbcs__add-to-cart");
    cartActions.loadCartCounter();

    WishList.addToWishList();

    new BbcCart("cart-items", "cart-total", "checkout-btn");
    
    new BbcSubscription(".bbcs__subscribe-btn", ".bbcs__shop-now-btn");
    new RegistrationBbcModal("registration-modal", ".bbcs__close", "#event-name", ".bbcs__register-btn", "#registration-form");

    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".bbcs___search_icon")) {
            document.querySelector(".bbcs__search_box").classList.toggle("bbcs___show_search");
        }
    });
    
});

document.addEventListener("DOMContentLoaded", () => {

    if(typeof Glide !== "undefined"){
        
        new Glide('.glide', {
            type: 'carousel', // or 'slider'
            startAt: 0,
            perView: 3, 
            autoplay: 2000,
            hoverpause: true, 
            animationDuration: 300,
            breakpoints: {
                800: { perView: 2 }, 
                680: { perView: 1 }  
            }
        }).mount();

        
        new CartActions(".bbcs__add-to-cart").loadCartCounter();
        
    }

})
