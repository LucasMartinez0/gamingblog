// Navbar: transparente arriba, con fondo de vidrio al hacer scroll
const nav = document.querySelector(".site-nav");

if (nav) {
  const actualizarNavbar = () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", actualizarNavbar, { passive: true });
  actualizarNavbar();
}