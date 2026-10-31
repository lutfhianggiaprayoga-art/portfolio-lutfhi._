
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    const mainContent = document.getElementById("mainContent");
    const enterBtn = document.getElementById("enterBtn");
    const particles = document.getElementById("particles");

    let entered = false;
    let introTimer;

    // Membuat partikel yang jatuh dari atas
    for (let i = 0; i < 65; i++) {
        const particle = document.createElement("span");
        particle.className = "particle";

        particle.style.left = Math.random() * 100 + "%";
        particle.style.setProperty(
            "--duration",
            (4 + Math.random() * 7) + "s"
        );
        particle.style.setProperty(
            "--delay",
            (-Math.random() * 10) + "s"
        );
        particle.style.setProperty(
            "--drift",
            (Math.random() * 100 - 50) + "px"
        );

        const size = 1 + Math.random() * 3;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particles.appendChild(particle);
    }

    // Animasi elemen ketika masuk ke layar
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }

    // Masuk ke website utama
    function enterPortfolio() {
        if (entered) return;

        entered = true;
        clearTimeout(introTimer);

        intro.classList.add("exit");
        mainContent.classList.add("ready");
        document.body.classList.remove("intro-active");

        // Hapus intro setelah transisi selesai
        setTimeout(() => {
            intro.style.display = "none";
        }, 1100);
    }

    // Masuk ketika tombol diklik
    enterBtn.addEventListener("click", enterPortfolio);

    // Masuk otomatis setelah 8 detik
    introTimer = setTimeout(enterPortfolio, 8000);

    // Tutup welcome jika tombol Escape ditekan
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !entered) {
            enterPortfolio();
        }
    });
});
