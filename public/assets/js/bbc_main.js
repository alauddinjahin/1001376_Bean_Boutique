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

class BbcSlider {
    constructor(slideClass) {
        this.slideIndex = 0;
        this.activeSlide=false;
        this.slides = document.querySelectorAll(slideClass);
        if(this.slides?.length) this.showSlides();
    }

    showSlides() {

        this.slides.forEach(slide => {
            slide.style.display = "none";
            slide.querySelectorAll("[data-item]").forEach(item=>{

                item.addEventListener("mouseenter",(e)=>{
                    slide.classList.add("active")
                    slide.style.display = "block";
                    this.activeSlide = true;
                })
    
                item.addEventListener("mouseleave",(e)=>{
                    slide.classList.remove("active")
                    this.activeSlide = false;
                })
            })


        });

        if(!this.activeSlide){
            this.slideIndex++;
        }

        if (this.slideIndex > this.slides.length) { this.slideIndex = 1; }

        const currentElem = this.slides[this.slideIndex - 1] || null;
        if(currentElem){
            currentElem.style.display = "block";
        }
        
        setTimeout(() => this.showSlides(), 3000);
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

    loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.cartItemsContainer.innerHTML = "";
        let total = 0;
        const counter = document.querySelector(".cart-counter");
        counter.textContent = cart?.length || 0;

        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            this.cartItemsContainer.appendChild(cartItem);
            total += item.price;
        });

        this.cartTotal.innerText = total.toFixed(2);

        document.querySelectorAll(".remove-btn").forEach(button => {
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
        const counter = document.querySelector(".cart-counter");
        counter.textContent = this.getCart()?.length || 0;
    }

    addToCart() {
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
        this.closeBtn = document.querySelector(closeBtnClass);
        this.eventNameElement = document.querySelector(eventNameSelector);
        this.registerButtons = document.querySelectorAll(registerButtonSelector);
        this.registrationForm = document.querySelector(formSelector);
        if(this.BbcModal) this.init();
    }

    init() {
        this.registerButtons.forEach(button => {
            button.addEventListener("click", (event) => this.openBbcModal(event));
        });

        this.closeBtn.addEventListener("click", () => this.closeBbcModal());

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

class NavBar{
    constructor(){
        this.navLinks = document.querySelectorAll("header nav #nav-links a");
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


document.addEventListener("DOMContentLoaded", () => {

    new NavBar().activeMenu();

    new BbcDiscountBbcModal("discount-BbcModal", ".close", "signup-btn");
    new BbcMenuToggle("menu-toggle", "nav-links");
    new BbcSlider(".slide");
    new BbcModal("discount-BbcModal", ".close", true);
    new BbcProductInteraction(".coffee-item");
    new BbcProductInteraction(".equipment-item");
    new BbcCart("cart-items", "cart-total", "checkout-btn");

    const cartActions = new CartActions(".add-to-cart");
    cartActions.loadCartCounter();
    
    new BbcSubscription(".subscribe-btn", ".shop-now-btn");
    new RegistrationBbcModal("registration-modal", ".close", "#event-name", ".register-btn", "#registration-form");
});
