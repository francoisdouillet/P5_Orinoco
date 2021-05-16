let dataOnStorage = JSON.parse(localStorage.getItem("basket"));

let quantityTotal = dataOnStorage.length;
const totalQuantity = document.getElementById("quantityBasket");
totalQuantity.textContent = `(${quantityTotal})`;
