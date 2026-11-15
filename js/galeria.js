(() => {
  if (window.galeriaIniciada) return;
  window.galeriaIniciada = true;

  // 1) Buscamos todas las tarjetas de video de la página.
  const tarjetas = document.querySelectorAll(".gal-card");

  tarjetas.forEach((tarjeta) => {
    const video = tarjeta.querySelector("video");
    if (!video) return; // si una tarjeta no tiene video, la saltamos

    const rutaPortada = video.getAttribute("poster");
    if (rutaPortada) {
      const portada = document.createElement("img");
      portada.className = "gal-poster";
      portada.src = rutaPortada;
      portada.alt = ""; // decorativa: el video ya tiene su aria-label
      video.insertAdjacentElement("afterend", portada); // justo después del video
    }


    video.addEventListener("playing", () => tarjeta.classList.add("is-playing"));
    video.addEventListener("pause", () => tarjeta.classList.remove("is-playing"));
    video.addEventListener("ended", () => tarjeta.classList.remove("is-playing"));

    
    const reproducir = () => video.play().catch(() => {});

    // 5) Detener: pausa y vuelve al inicio. El evento "pause" de arriba
    
    const detener = () => {
      video.pause();
      video.currentTime = 0;
    };

    // 6) Mouse: reproduce al entrar y detiene al salir.
    //    pointerType distingue mouse de dedo, para no mezclar hover con toques.
    tarjeta.addEventListener("pointerenter", (e) => {
      if (e.pointerType === "mouse") reproducir();
    });
    tarjeta.addEventListener("pointerleave", (e) => {
      if (e.pointerType === "mouse") detener();
    });

    // 7) Celular: un toque reproduce y otro toque vuelve a la portada.
    tarjeta.addEventListener("click", (e) => {
      if (e.pointerType === "mouse") return;
      if (video.paused) reproducir();
      else detener();
    });
  });

  // 8) BANNER: el HTML ya tiene "autoplay", pero algunos navegadores lo frenan.

  const bannerVideo = document.querySelector(".gal-banner-video");
  if (bannerVideo) {
    bannerVideo.muted = true; // el autoplay solo se permite sin sonido
    bannerVideo.play().catch(() => {});
  }
})();