//Recuperation données local storage
let dataStorage = JSON.parse(localStorage.getItem("basket"));
console.log(dataStorage);

let quantityTotal = dataStorage.length
console.log(quantityTotal)
const totalQuantity = document.getElementById("quantityBasket")
totalQuantity.textContent = `(${quantityTotal})`

// Fonction pour supprimer un élement du storage
const removeElementFromBasket = (name) => {
  let basket = JSON.parse(localStorage.getItem("basket"));

  const basketWithoutRemovedElement = basket.filter(
    (elem) => elem.name !== name
  );

  localStorage.setItem("basket", JSON.stringify(basketWithoutRemovedElement));
  window.location.href = "cart.html";
};
// Recuperation ID
const getBasketId = document.getElementById("basket");
const titlePage = document.getElementById("title");

//Affichage des élements du local storage
if (dataStorage == null || dataStorage.length === 0) {
  titlePage.innerHTML = "Votre panier est vide !";
} else {
  titlePage.innerHTML = "Votre panier:";
  let i = 0;
  for (dataStorages of dataStorage) {
    // Creation de la div avec l'article
    const itemCard = document.createElement("div");
    getBasketId.appendChild(itemCard);
    itemCard.className =
      "basketcard border-2 border-black flex p-3 mt-10 justify-between items-center";
    itemCard.id = i++;

    const titleCard = document.createElement("p");
    itemCard.appendChild(titleCard);
    titleCard.textContent = dataStorages.quantity + " x " + dataStorages.name;

    const priceCard = document.createElement("div");
    itemCard.appendChild(priceCard);
    priceCard.className = "flex items-center";

    const price = document.createElement("p");
    priceCard.appendChild(price);
    price.textContent = dataStorages.price / 100 + " €";

    // Boutton pour supprimer l'article

    const deleteButton = document.createElement("button");
    priceCard.appendChild(deleteButton);
    deleteButton.className = "basketbutton p-2 ml-2";
    // Supression de l'article du local storage
    deleteButton.addEventListener("click", () =>
      removeElementFromBasket(dataStorages.name)
    );

    const iconButton = document.createElement("i");
    deleteButton.appendChild(iconButton);
    iconButton.className = "fas fa-trash-alt";
  }
  //Recuperation prix
  let getPrice = [];
  for (let m = 0; m < dataStorage.length; m++) {
    let priceInBasket = dataStorage[m].price / 100;
    getPrice.push(priceInBasket);
  }
  //Calcul prix total
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const totalPrice = getPrice.reduce(reducer);
  titlePage.innerHTML = "Votre panier:";
  // Ajout du prix au HTML
  const displayPrice = document.createElement("p");
  getBasketId.appendChild(displayPrice);
  displayPrice.textContent = `Prix total de la commande: ${totalPrice} €`;
  displayPrice.className = "mt-6 font-bold text-2xl";

  // Formulaire de renseignement
  const form = document.createElement("div");
  form.innerHTML = `<form class="p-6 m-auto flex flex-col" id="form" name="userInput" onsubmit="submitInfo()" action="order.html">
    <label class="mb-2 font-bold" for="prenom">Prénom :</label>
    <input class="mb-2 border-2 border-gray-500" type="text" id="prenom" pattern="[a-zA-Z ]*" placeholder="Prénom" required>
    <label class="mb-2 font-bold" fpr="nom">Nom :</label>
    <input class="mb-2 border-2 border-gray-500" type="text" id="nom" pattern="[a-zA-Z ]*" placeholder="Nom" required>
    <label class="mb-2 font-bold" for="adress">Adresse :</label>
    <input class="mb-2 border-2 border-gray-500" type="text" id="adress" pattern="[a-zA-Z ]*" placeholder="Adresse" required>
    <label class="mb-2 font-bold" for="city">Ville :</label>
    <input class="mb-2 border-2 border-gray-500" type="text" id="city" pattern="[a-zA-Z ]*" placeholder="Ville" required>
    <label class="mb-2 font-bold" for="email">Email :</label>
    <input class="mb-2 border-2 border-gray-500" type="text" id="email" type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="exemple@gmail.com" required>
    <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold m-auto mt-10 w-full md:w-1/2" type="submit" id="submit">Confirmer la commande</button>
</form>`;
  getBasketId.appendChild(form);
}
