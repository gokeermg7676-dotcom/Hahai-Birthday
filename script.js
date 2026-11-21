document.addEventListener("DOMContentLoaded", () => {
    initConfigData();

    const stages = [
        document.getElementById("stage-1"),
        document.getElementById("stage-2")
    ];
    
    let currentStage = 0;
    const nextStageBtn = document.getElementById("next-stage-btn");
    const experienceOverlay = document.getElementById("experience-overlay");
    const mainWebsite = document.getElementById("main-website");

    if (nextStageBtn) {
        nextStageBtn.addEventListener("click", () => {
            currentStage++;
            playBackgroundMusic();

            if (currentStage < stages.length) {
                stages.forEach((s, idx) => {
                    if (idx === currentStage) {
                        s.style.display = "block";
                        s.style.opacity = 0;
                        setTimeout(() => s.style.opacity = 1, 50);
                    } else {
                        s.style.display = "none";
                    }
                });
            } else {
                experienceOverlay.classList.add("hidden");
                mainWebsite.classList.add("visible");
            }
        });
    }

    const musicToggle = document.getElementById("music-toggle");
    const bgAudio = document.getElementById("bg-audio");
    let isPlaying = false;

    if (musicToggle && bgAudio) {
        musicToggle.addEventListener("click", () => {
            if (isPlaying) {
                bgAudio.pause();
                musicToggle.innerHTML = "🎵";
                isPlaying = false;
            } else {
                bgAudio.play().then(() => {
                    musicToggle.innerHTML = "🔇";
                    isPlaying = true;
                }).catch(e => console.log("Audio play blocked"));
            }
        });
    }

    function playBackgroundMusic() {
        if (bgAudio && !isPlaying) {
            bgAudio.play().then(() => {
                if (musicToggle) musicToggle.innerHTML = "🔇";
                isPlaying = true;
            }).catch(e => console.log("Auto-play prevented"));
        }
    }

    const openModalBtn = document.getElementById("open-modal-btn");
    const closeModalBtn = document.getElementById("close-modal-btn");
    const modalOverlay = document.getElementById("modal-overlay");

    if (openModalBtn && modalOverlay) {
        openModalBtn.addEventListener("click", () => modalOverlay.classList.add("active"));
    }
    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener("click", () => modalOverlay.classList.remove("active"));
    }
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) modalOverlay.classList.remove("active");
        });
    }

    const baleBtn = document.getElementById("bale-btn");
    if (baleBtn) {
        baleBtn.addEventListener("click", () => {
            baleBtn.innerText = "در حال باز کردن...";
            setTimeout(() => {
                window.open(siteConfig.baleChannelLink, "_blank");
                baleBtn.innerText = "ادامه‌ی ماجرا";
            }, 800);
        });
    }

    let secretClicks = 0;
    const secretTrigger = document.getElementById("secret-trigger");
    if (secretTrigger) {
        secretTrigger.addEventListener("click", () => {
            secretClicks++;
            if (secretClicks === 3) {
                alert("✨ راز کوچک: هاهایی عزیز، دنیای ما با لبخند تو زیباترین جای دنیاست!");
                secretClicks = 0;
            }
        });
    }
});

function initConfigData() {
    if (typeof siteConfig === "undefined") return;

    setElementText("config-name", siteConfig.name);
    setElementText("config-birthday", siteConfig.birthday);
    setElementText("config-hero-title", siteConfig.heroTitle);
    setElementText("config-hero-subtitle", siteConfig.heroSubtitle);
    setElementText("modal-title", siteConfig.specialMessageTitle);
    setElementText("modal-text", siteConfig.birthdayMessage);

    const heroImgEl = document.getElementById("hero-img");
    if (heroImgEl && siteConfig.heroImage) {
        heroImgEl.src = siteConfig.heroImage;
        heroImgEl.onerror = function() {
            this.parentElement.innerHTML = '<div class="placeholder-img">تصویر اصلی هاهایی</div>';
        };
    }

    const galleryGrid = document.getElementById("gallery-grid");
    if (galleryGrid && siteConfig.gallery) {
        galleryGrid.innerHTML = siteConfig.gallery.map(item => `
            <div class="gallery-card">
                <div class="gallery-img-box">
                    <img src="${item.image}" alt="Memory" onerror="this.parentElement.innerHTML='<div class=\'placeholder-img\'>قاب عکس</div>'">
                </div>
                <div class="gallery-caption">${item.caption}</div>
            </div>
        `).join("");
    }

    const memoriesGrid = document.getElementById("memories-grid");
    if (memoriesGrid && siteConfig.memories) {
        memoriesGrid.innerHTML = siteConfig.memories.map(item => `
            <div class="memory-item">
                <h3>${item.title}</h3>
                <p>${item.text}</p>
            </div>
        `).join("");
    }

    const bgAudio = document.getElementById("bg-audio");
    const audioSource = document.getElementById("audio-source");
    if (audioSource && siteConfig.music) {
        audioSource.src = siteConfig.music;
        if (bgAudio) bgAudio.load();
    }
}

function setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
}