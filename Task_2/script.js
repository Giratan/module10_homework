const btn = document.querySelector(".button");

const size1 = "Ширина без учета полосы прокрутки: " + document.documentElement.clientWidth +  "\nВысота без учета полосы прокрутки: " + document.documentElement.clientHeight + "\n\n";
const size2 = "Ширина с учетом полосы прокрутки: " + window.innerWidth + "\n Высота с учетом полосы прокрутки: " + window.innerHeight;

btn.addEventListener("click", () => {
    alert(size1 + size2);
})