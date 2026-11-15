
/* ==========================================
   UM BUQUÊ PARA VOCÊ
   VERSION 2.0
   Romantic Flower Arrangement
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // 1. ELEMENTOS DA PÁGINA
    // ======================================

    const intro = document.getElementById("intro");
    const bouquetScreen = document.getElementById("bouquet-screen");
    const letterScreen = document.getElementById("letter-screen");
    const surpriseScreen = document.getElementById("surprise-screen");

    const startButton = document.getElementById("start-button");
    const letterButton = document.getElementById("letter-button");
    const surpriseButton = document.getElementById("second-surprise-button");

    const flowersContainer = document.getElementById("bouquet-flowers");
    const leavesContainer = document.getElementById("bouquet-leaves");
    const stemsContainer = document.getElementById("bouquet-stems");

    const wrapper = document.getElementById("bouquet-wrapper");
    const ribbon = document.getElementById("bouquet-ribbon");

    const starsContainer = document.getElementById("stars");
    const particlesContainer = document.getElementById("particles");
    const petalsContainer = document.getElementById("falling-petals");

    const bouquetCaption = document.getElementById("bouquet-caption");

    const isMobile = window.innerWidth <= 600;

    const sleep = ms =>
        new Promise(resolve => setTimeout(resolve, ms));


    // ======================================
    // 2. CONFIGURAÇÕES DO BUQUÊ
    // ======================================

    const containerHeight = isMobile ? 355 : 410;
    const bottomOffset = 65;

    // Cada flor tem uma posição planejada.
    // As coordenadas são porcentagens da área.

    const flowers = [

        // LÍRIOS PRINCIPAIS

        {
            type: "lily",
            x: 50,
            y: 17,
            size: 105,
            petals: 6,
            rotation: 0
        },

        {
            type: "lily",
            x: 27,
            y: 30,
            size: 92,
            petals: 6,
            rotation: -12
        },

        {
            type: "lily",
            x: 73,
            y: 30,
            size: 92,
            petals: 6,
            rotation: 12
        },

        // ROSAS COMPLEMENTARES

        {
            type: "rose",
            x: 40,
            y: 40,
            size: 68,
            petals: 12,
            rotation: -8
        },

        {
            type: "rose",
            x: 60,
            y: 40,
            size: 68,
            petals: 12,
            rotation: 8
        },

        {
            type: "rose",
            x: 17,
            y: 47,
            size: 64,
            petals: 12,
            rotation: -12
        },

        {
            type: "rose",
            x: 83,
            y: 47,
            size: 64,
            petals: 12,
            rotation: 12
        },

        {
            type: "rose",
            x: 50,
            y: 46,
            size: 68,
            petals: 12,
            rotation: 0
        }

    ];


    // ======================================
    // 3. TRANSIÇÕES DE TELA
    // ======================================

    function showScreen(target) {

        const screens = [
            intro,
            bouquetScreen,
            letterScreen,
            surpriseScreen
        ];

        screens.forEach(screen => {
            screen.classList.remove("active");
        });

        target.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ======================================
    // 4. ESTRELAS
    // ======================================

    function createStars() {

        const quantity = isMobile ? 65 : 110;

        for (let i = 0; i < quantity; i++) {

            const star = document.createElement("div");

            star.className = "star";

            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";

            const size = Math.random() * 2 + 1;

            star.style.width = size + "px";
            star.style.height = size + "px";

            star.style.animationDelay =
                Math.random() * 5 + "s";

            star.style.animationDuration =
                (Math.random() * 3 + 2) + "s";

            starsContainer.appendChild(star);
        }
    }


    // ======================================
    // 5. PARTÍCULAS LUMINOSAS
    // ======================================

    function createParticles() {

        const quantity = isMobile ? 18 : 30;

        for (let i = 0; i < quantity; i++) {

            const particle = document.createElement("div");

            particle.className = "particle";

            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";

            particle.style.animationDelay =
                Math.random() * 8 + "s";

            particle.style.animationDuration =
                (Math.random() * 6 + 6) + "s";

            particlesContainer.appendChild(particle);
        }
    }


    // ======================================
    // 6. PÉTALAS CAINDO
    // ======================================

    let petalInterval = null;

    function createFallingPetal() {

        const petal = document.createElement("div");

        petal.className = "falling-petal";

        petal.style.left = Math.random() * 100 + "vw";

        petal.style.setProperty(
            "--duration",
            (Math.random() * 5 + 6) + "s"
        );

        petal.style.setProperty(
            "--drift",
            (Math.random() * 180 - 90) + "px"
        );

        petalsContainer.appendChild(petal);

        petal.addEventListener("animationend", () => {
            petal.remove();
        });
    }

    function startPetalRain() {

        if (petalInterval) return;

        petalInterval = setInterval(() => {

            createFallingPetal();

        }, 650);
    }


    // ======================================
    // 7. CRIAR PÉTALAS DAS FLORES
    // ======================================

    function createFlower(data, index) {

        const flower = document.createElement("div");

        flower.className = `flower ${data.type}`;

        flower.style.setProperty("--x", data.x + "%");
        flower.style.setProperty("--y", data.y + "%");

        flower.style.setProperty(
            "--flower-size",
            data.size + "px"
        );

        flower.style.setProperty(
            "--flower-size-mobile",
            Math.round(data.size * 0.8) + "px"
        );

        flower.style.setProperty(
            "--rotation",
            data.rotation + "deg"
        );

        flower.style.animationDelay = "0s";

        // Camadas de pétalas

        for (let i = 0; i < data.petals; i++) {

            const petal = document.createElement("div");

            petal.className = "petal";

            const angle = (360 / data.petals) * i;

            petal.style.transform =
                `translate(-50%, -100%) rotate(${angle}deg)`;

            flower.appendChild(petal);
        }

        // Centro da flor

        const center = document.createElement("div");

        center.className = "flower-center";

        flower.appendChild(center);

        // Pequenos detalhes dos lírios

        if (data.type === "lily") {

            for (let i = 0; i < 6; i++) {

                const stamen = document.createElement("span");

                stamen.style.position = "absolute";
                stamen.style.width = "3px";
                stamen.style.height = "20px";

                stamen.style.left = "50%";
                stamen.style.top = "50%";

                stamen.style.transformOrigin = "50% 0";
                stamen.style.transform =
                    `rotate(${i * 60 + 30}deg)`;

                stamen.style.borderTop = "2px solid #d8a94e";
                stamen.style.borderRadius = "50%";

                stamen.style.pointerEvents = "none";

                flower.appendChild(stamen);
            }
        }

        flowersContainer.appendChild(flower);

        return flower;
    }


    // ======================================
    // 8. CRIAR CAULES
    // ======================================

    function createStems() {

        flowers.forEach((flower, index) => {

            const stem = document.createElement("div");

            stem.className = "stem";

            const flowerY =
                (flower.y / 100) * containerHeight;

            const stemHeight =
                containerHeight - flowerY - bottomOffset;

            stem.style.setProperty(
                "--x",
                flower.x + "%"
            );

            stem.style.setProperty(
                "--stem-height",
                Math.max(50, stemHeight) + "px"
            );

            stem.style.setProperty(
                "--rotation",
                ((flower.x - 50) * 0.35) + "deg"
            );

            stem.style.animationDelay =
                (index * 0.12) + "s";

            stemsContainer.appendChild(stem);
        });
    }


    // ======================================
    // 9. FOLHAGENS
    // ======================================

    const leaves = [

        { x: 24, y: 65, rotation: -55, size: 1.1 },
        { x: 34, y: 72, rotation: 45, size: 1 },
        { x: 66, y: 67, rotation: 55, size: 1.1 },
        { x: 76, y: 70, rotation: -45, size: 1 },

        { x: 42, y: 78, rotation: -50, size: 1 },
        { x: 58, y: 77, rotation: 50, size: 1 },

        { x: 18, y: 59, rotation: -35, size: 0.8 },
        { x: 82, y: 60, rotation: 35, size: 0.8 },

        { x: 31, y: 82, rotation: -65, size: 0.8 },
        { x: 70, y: 82, rotation: 65, size: 0.8 }

    ];

    function createLeaves() {

        leaves.forEach((data, index) => {

            const leaf = document.createElement("div");

            leaf.className = "leaf";

            leaf.style.left = data.x + "%";
            leaf.style.top = data.y + "%";

            leaf.style.width = (38 * data.size) + "px";
            leaf.style.height = (78 * data.size) + "px";

            leaf.style.setProperty(
                "--rotation",
                data.rotation + "deg"
            );

            leaf.style.animationDelay =
                (index * 0.15) + "s";

            leavesContainer.appendChild(leaf);
        });
    }


    // ======================================
    // 10. MOSQUITINHOS
    // ======================================

    const babyBreaths = [

        { x: 36, y: 24, size: 8 },
        { x: 42, y: 20, size: 6 },
        { x: 62, y: 23, size: 8 },
        { x: 68, y: 25, size: 6 },

        { x: 18, y: 36, size: 7 },
        { x: 24, y: 39, size: 6 },

        { x: 77, y: 37, size: 7 },
        { x: 84, y: 40, size: 6 },

        { x: 34, y: 51, size: 6 },
        { x: 67, y: 51, size: 6 },

        { x: 45, y: 31, size: 5 },
        { x: 56, y: 30, size: 5 }

    ];

    function createBabyBreaths() {

        babyBreaths.forEach((data, index) => {

            const flower = document.createElement("div");

            flower.className = "baby-breath";

            flower.style.setProperty("--x", data.x + "%");
            flower.style.setProperty("--y", data.y + "%");

            flower.style.setProperty(
                "--size",
                data.size + "px"
            );

            flower.style.animationDelay =
                (index * 0.12) + "s";

            flowersContainer.appendChild(flower);
        });
    }


    // ======================================
    // 11. PREPARAR EMBRULHO E LAÇO
    // ======================================

    function resetWrapping() {

        wrapper.style.animation = "none";
        ribbon.style.animation = "none";

        wrapper.style.opacity = "0";
        ribbon.style.opacity = "0";

        void wrapper.offsetWidth;
        void ribbon.offsetWidth;
    }

    function showWrapping() {

        wrapper.style.animation =
            "wrapperAppear 1.5s ease forwards";

        ribbon.style.animation =
            "ribbonAppear 1.2s ease forwards";
    }


    // ======================================
    // 12. MONTAR O BUQUÊ
    // ======================================

    let bouquetBuilt = false;

    async function buildBouquet() {

        if (bouquetBuilt) return;

        bouquetBuilt = true;

        flowersContainer.innerHTML = "";
        leavesContainer.innerHTML = "";
        stemsContainer.innerHTML = "";

        bouquetCaption.style.opacity = "0";
        letterButton.classList.add("hidden");

        resetWrapping();

        // ETAPA 1: CAULES

        createStems();

        await sleep(1100);

        // ETAPA 2: FOLHAGENS

        createLeaves();

        await sleep(1000);

        // ETAPA 3: MOSQUITINHOS

        createBabyBreaths();

        await sleep(800);

        // ETAPA 4: LÍRIOS E ROSAS

        for (let i = 0; i < flowers.length; i++) {

            createFlower(flowers[i], i);

            await sleep(450);
        }

        // ETAPA 5: EMBRULHO

        await sleep(1500);

        showWrapping();

        await sleep(1400);

        // ETAPA 6: ENTREGA

        bouquetCaption.style.transition =
            "opacity 2s ease";

        bouquetCaption.style.opacity = "1";

        letterButton.classList.remove("hidden");

        startPetalRain();
    }


    // ======================================
    // 13. BOTÃO INICIAL
    // ======================================

    startButton.addEventListener("click", async () => {

        startButton.disabled = true;

        showScreen(bouquetScreen);

        await sleep(700);

        await buildBouquet();

        startButton.disabled = false;
    });


    // ======================================
    // 14. ABRIR CARTA
    // ======================================

    letterButton.addEventListener("click", () => {

        showScreen(letterScreen);

        startPetalRain();
    });


    // ======================================
    // 15. SEGUNDA SURPRESA
    // ======================================

    surpriseButton.addEventListener("click", () => {

        showScreen(surpriseScreen);

        startPetalRain();
    });


    // ======================================
    // 16. INICIALIZAÇÃO
    // ======================================

    createStars();

    createParticles();

});
