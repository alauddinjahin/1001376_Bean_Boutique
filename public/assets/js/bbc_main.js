

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
        if (localStorage.getItem("visited") != "true") {
            setTimeout(() => { this.BbcModal.style.display = "block"; }, 2000);
            localStorage.setItem("visited", "true");
        }

        this.closeBtn.addEventListener("click", () => { 
            this.BbcModal.style.display = "none"; 
        });

        this.signupBtn.addEventListener("click", () => {
            alert("Thank you!");
            this.BbcModal.style.display = "none";
        });
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


document.addEventListener("DOMContentLoaded", () => {

    // check menus active or not
    new NavBar().activeMenu();
    new BbcMenuToggle("menu-toggle", "__nav-links");

    // open discount modal for the firstime user
    new BbcDiscountBbcModal("discount-modal", ".bbcs__close", "signup-btn");

    // sticky header on scroll
    window.addEventListener("scroll", function () {
        let headerElem = document.querySelector("header.__header_bccs_wrapper");
        let className = "__sticky_transition";
        if (window.scrollY > 50) {
            headerElem.classList.add(className)
        }else{
            headerElem.classList.remove(className)
        }
    });



    // scroll top 
    const scrollTopBtn = document.getElementById("bbcs__scroll__top__button");
    if(scrollTopBtn){

        const __toggleScrollTopBtn = ()=>{
            let displayProperty = "none";
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                displayProperty = "block";
            } 
    
            scrollTopBtn.style.display = displayProperty;
        }
    
        const __scrollTopFunction = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
        
        window.onscroll = __toggleScrollTopBtn
        scrollTopBtn.addEventListener("click", __scrollTopFunction)
    }


    
    // toggle search bar on click
    document.body.addEventListener("click", function (event) {
        if (event.target.closest(".bbcs___search_icon")) {
            document.querySelector(".bbcs__search_box").classList.toggle("bbcs___show_search");
            document.querySelector(".overlay__search").classList.add("active")
        }

        if (event.target.closest(".bbcs___search_times_icon")) {
            document.querySelector(".bbcs__search_box").classList.remove("bbcs___show_search");
            document.querySelector(".overlay__search").classList.remove("active")

        }
    });


    // Home page slider 
    if(typeof Glide !== "undefined"){

        const configGlide = {
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
        };
        
        new Glide('.glide', configGlide).mount();
        
    }

    
});


