const mainPage = document.querySelector(".mainPage");
const cardMen = document.querySelector(".cardMen");
const product = document.querySelector(".product");
const aboutPage = document.querySelector(".about");
const contactPage = document.querySelector(".contact");
const faqs = document.querySelector(".FAQs");
const testimonialPage = document.querySelector(".testimonial");
const blogContent = document.querySelector(".blogContent");

function hideAllSections() {
  [mainPage, cardMen, product, aboutPage, contactPage, faqs, testimonialPage, blogContent].forEach(section => {
    if (section) section.style.display = "none";
  });
}

function setActiveNav(id) {
  ["home", "product", "blog", "about", "contact", "FAQs", "testimonial"].forEach(nav => {
    const navItem = document.getElementById(nav);
    if (navItem) {
      navItem.classList.toggle("active", nav === id);
    }
  });
}

function showHome() {
  hideAllSections();
  if (mainPage) mainPage.style.display = "flex";
  if (cardMen) cardMen.style.display = "block";
  setActiveNav("home");
}

function showProduct() {
  hideAllSections();
  if (product) product.style.display = "block";
  setActiveNav("product");
}

function showBlog() {
  hideAllSections();
  if (blogContent) blogContent.style.display = "block";
  setActiveNav("blog");
}

function showAbout() {
  hideAllSections();
  if (aboutPage) aboutPage.style.display = "block";
  setActiveNav("about");
}

function showContact() {
  hideAllSections();
  if (contactPage) contactPage.style.display = "block";
  setActiveNav("contact");
}

function showFAQs() {
  hideAllSections();
  if (faqs) faqs.style.display = "block";
  setActiveNav("FAQs");
}

function showTestimonial() {
  hideAllSections();
  if (testimonialPage) testimonialPage.style.display = "block";
  setActiveNav("testimonial");
}

function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById("cart-count-mobile");
  if (cartCount) cartCount.textContent = cartItems.length;
}

function addToCart(id, event) {
  event.stopPropagation();
  const item = document.getElementById(id);
  const title = item.querySelector("h4").innerText;
  const description = item.querySelector(".description").innerText;
  const image = item.querySelector("img").getAttribute("src");
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cartItems.find(p => p.title === title && p.image === image);
  if (!exists) {
    cartItems.push({ title, description, image });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  alert(`${title} added to cart!`);
}

function buyNow(id, event) {
  event.stopPropagation();
  goToCheckout(id);
}

function goToCheckout(id) {
  const item = document.getElementById(id);
  if (!item) return;
  const title = item.querySelector("h4")?.innerText || "";
  const desc = item.querySelector(".description")?.innerText || "";
  const img = item.querySelector("img")?.getAttribute("src") || "";
  window.location.href = `checkout.html?title=${encodeURIComponent(title)}&desc=${encodeURIComponent(desc)}&img=${encodeURIComponent(img)}`;
}

document.querySelectorAll(".cart-btn").forEach(button => {
  button.addEventListener("click", function (event) {
    const id = this.getAttribute("data-id");
    if (id) addToCart(id, event);
  });
});

document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", function (event) {
    const id = this.getAttribute("data-id");
    if (id) buyNow(id, event);
  });
});

window.onload = updateCartCount;

["home", "product", "blog", "about", "contact", "FAQs", "testimonial"].forEach(id => {
  const nav = document.getElementById(id);
  if (nav) {
    nav.addEventListener("click", e => {
      e.preventDefault();
      ({
        home: showHome,
        product: showProduct,
        blog: showBlog,
        about: showAbout,
        contact: showContact,
        FAQs: showFAQs,
        testimonial: showTestimonial
      }[id]?.());
    });
  }
});
