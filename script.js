/* =========================
ELEMENTOS
========================= */

const loader = document.getElementById("loader");
const loadingText = document.getElementById("loadingText");
const progressBar = document.getElementById("progressBar");
const percentText = document.getElementById("percent");

const errorScreen = document.getElementById("errorScreen");
const constellationScreen = document.getElementById("constellationScreen");
const resultCard = document.getElementById("resultCard");

const continueBtn = document.getElementById("continueBtn");

const secretBtn = document.getElementById("secretBtn");
const secretMessage = document.getElementById("secretMessage");

const missionComplete = document.getElementById("missionComplete");

/* =========================
EFECTO MAQUINA ESCRIBIR
========================= */

const messages = [
    "Iniciando sistema...",
    "Conectando satélites...",
    "Escaneando galaxias...",
    "Buscando a la persona más especial...",
    "Analizando millones de estrellas...",
    "Comparando coincidencias...",
    "Verificando autenticidad..."
];

function typeText(text) {

    loadingText.innerHTML = "";

    let i = 0;

    const timer = setInterval(() => {

        loadingText.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){
            clearInterval(timer);
        }

    },40);
}

/* =========================
LOADER
========================= */

let percent = 0;
let messageIndex = 0;

typeText(messages[0]);

const loaderInterval = setInterval(() => {

    percent++;

    progressBar.style.width = percent + "%";
    percentText.innerHTML = percent + "%";

    if(percent === 15){
        typeText(messages[1]);
    }

    if(percent === 30){
        typeText(messages[2]);
    }

    if(percent === 45){
        typeText(messages[3]);
    }

    if(percent === 60){
        typeText(messages[4]);
    }

    if(percent === 80){
        typeText(messages[5]);
    }

    if(percent === 95){
        typeText(messages[6]);
    }

    if(percent >= 100){

        clearInterval(loaderInterval);

        setTimeout(() => {

            loader.classList.add("hidden");

            errorScreen.classList.remove("hidden");

            setTimeout(() => {

                errorScreen.classList.add("hidden");

                constellationScreen.classList.remove("hidden");

                drawConstellation();

            },2500);

        },1000);
    }

},80);

/* =========================
FONDO ESPACIAL
========================= */

const spaceCanvas = document.getElementById("space");
const spaceCtx = spaceCanvas.getContext("2d");

spaceCanvas.width = window.innerWidth;
spaceCanvas.height = window.innerHeight;

const stars = [];

for(let i=0;i<250;i++){

    stars.push({
        x:Math.random()*spaceCanvas.width,
        y:Math.random()*spaceCanvas.height,
        r:Math.random()*2,
        alpha:Math.random()
    });

}

function animateStars(){

    spaceCtx.clearRect(
        0,
        0,
        spaceCanvas.width,
        spaceCanvas.height
    );

    stars.forEach(star=>{

        star.alpha += (Math.random()-0.5)*0.05;

        if(star.alpha < 0.1){
            star.alpha = 0.1;
        }

        if(star.alpha > 1){
            star.alpha = 1;
        }

        spaceCtx.beginPath();
        spaceCtx.fillStyle =
        `rgba(255,255,255,${star.alpha})`;

        spaceCtx.arc(
            star.x,
            star.y,
            star.r,
            0,
            Math.PI*2
        );

        spaceCtx.fill();

    });

    requestAnimationFrame(animateStars);
}

animateStars();

/* =========================
CONSTELACION MICHELLE
========================= */

const canvas =
document.getElementById("constellationCanvas");

const ctx = canvas.getContext("2d");

function drawConstellation(){

    canvas.width = 1000;
    canvas.height = 450;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "white";

    ctx.font = "bold 120px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "MICHELLE",
        canvas.width/2,
        240
    );

    const imageData =
    ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const points = [];

    for(let y=0;y<canvas.height;y+=6){

        for(let x=0;x<canvas.width;x+=6){

            const index =
            (y * canvas.width + x) * 4;

            if(imageData.data[index + 3] > 128){

                points.push({
                    x,
                    y
                });

            }

        }

    }

    let visible = 0;

    const animation = setInterval(()=>{

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        for(let i=0;i<visible;i++){

            const p = points[i];

            ctx.beginPath();

            ctx.fillStyle = "#ffffff";

            ctx.arc(
                p.x,
                p.y,
                2,
                0,
                Math.PI*2
            );

            ctx.fill();

            if(i > 0){

                const prev =
                points[i-1];

                ctx.beginPath();

                ctx.strokeStyle =
                "rgba(0,217,255,.25)";

                ctx.moveTo(
                    prev.x,
                    prev.y
                );

                ctx.lineTo(
                    p.x,
                    p.y
                );

                ctx.stroke();
            }
        }

        visible += 8;

        if(visible >= points.length){

            clearInterval(animation);

        }

    },15);
}

/* =========================
CONTINUAR
========================= */

continueBtn.addEventListener("click",()=>{

    constellationScreen.classList.add("hidden");

    resultCard.classList.remove("hidden");

});

/* =========================
MENSAJE SECRETO
========================= */

secretBtn.addEventListener("click",()=>{

    secretMessage.style.display = "block";

    for(let i=0;i<35;i++){

        setTimeout(()=>{

            createHeart();

        },i*120);

    }

    setTimeout(()=>{

        resultCard.classList.add("hidden");

        missionComplete.classList.remove("hidden");

    },8000);

});

/* =========================
CORAZONES
========================= */

function createHeart(){

    const heart =
    document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left =
    Math.random()*100 + "vw";

    heart.style.bottom = "0px";

    heart.style.fontSize =
    (20 + Math.random()*25) + "px";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },4000);
}

/* =========================
RESIZE
========================= */

window.addEventListener("resize",()=>{

    spaceCanvas.width =
    window.innerWidth;

    spaceCanvas.height =
    window.innerHeight;

});
