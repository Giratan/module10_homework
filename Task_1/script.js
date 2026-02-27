const text = document.querySelector("#text");

const icon1 = document.querySelector(".bi-arrow-down-left-circle");
const icon2 = document.querySelector(".bi-arrow-down-left-circle-fill");
const iconDiv = document.querySelector(".conten__icon");

iconDiv.addEventListener("click", () => {
    if (icon1.style.display === "none") {
        icon1.style.display = "block";
        icon2.style.display = "none";
        text.textContent = "Активна иконка №1";
    } else {
        icon1.style.display = "none";
        icon2.style.display = "block";
        text.textContent = "Активна иконка №2";
    }
})