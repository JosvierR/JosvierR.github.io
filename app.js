// Parallax on scroll
window.addEventListener("scroll", () => {
    const phone = document.querySelector(".hero-phone");
    const offset = window.scrollY * 0.15;
    phone.style.transform = `translateY(${offset}px)`;
});
