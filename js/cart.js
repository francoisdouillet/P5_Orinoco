//Recuperation données local storage
let basket = JSON.parse(localStorage.getItem("basket"));
console.log(basket);

// Fonction pour supprimer un élement du storage
const removeElementFromBasket = (name) => {
  let basket = JSON.parse(localStorage.getItem("basket"));

  const basketWithoutRemovedElement = basket.filter(
    (elem) => elem.name !== name
  );

  localStorage.setItem("basket", JSON.stringify(basketWithoutRemovedElement));
  document.location.reload();
};
// Recuperation ID
const getBasketId = document.getElementById("basket");
const titlePage = document.getElementById("title");
let totalPrice = 0;

//Affichage des élements du local storage
if (basket == null || basket.length === 0) {
  titlePage.innerHTML = "Votre panier est vide !";
} else {
  titlePage.innerHTML = "Votre panier:";
  let i = 0;
  for (baskets of basket) {
    // total prix
    totalPrice += baskets.price / 100;
    // Creation de la div avec l'article
    const itemCard = document.createElement("div");
    getBasketId.appendChild(itemCard);
    itemCard.className =
      "basketcard border-2 border-black flex p-3 mt-10 justify-between items-center";
    itemCard.id = i++;
    // Ajout des éléments du panier
    const titleCard = document.createElement("p");
    itemCard.appendChild(titleCard);
    titleCard.textContent = baskets.quantity + " x " + baskets.name;

    const priceCard = document.createElement("div");
    itemCard.appendChild(priceCard);
    priceCard.className = "flex items-center";

    const price = document.createElement("p");
    priceCard.appendChild(price);
    price.textContent = baskets.price / 100 + " €";

    // Boutton pour supprimer l'article

    const deleteButton = document.createElement("button");
    priceCard.appendChild(deleteButton);
    deleteButton.className = "basketbutton p-2 ml-2";
    // Supression de l'article du local storage
    deleteButton.addEventListener("click", () =>
      removeElementFromBasket(baskets.name)
    );
    // Icone de supression
    const iconButton = document.createElement("i");
    deleteButton.appendChild(iconButton);
    iconButton.className = "fas fa-trash-alt";
  }

  // Ajout du prix total
  const displayPrice = document.createElement("p");
  getBasketId.appendChild(displayPrice);
  displayPrice.textContent = `Prix total de la commande: ${totalPrice} €`;
  displayPrice.className = "mt-6 font-bold text-2xl";

  // Formulaire de renseignement
  const form = document.createElement("div");
  form.innerHTML = `<form class="p-6 m-auto flex flex-col" name="userInput">
    <label class="mb-2 font-bold" for="prenom">Prénom :</label>
    <input class="input mb-2 border-2 border-gray-500" type="text" id="prenom" pattern="[a-zA-Z ]*" placeholder="Prénom" required>
    <label class="mb-2 font-bold" fpr="nom">Nom :</label>
    <input class="input mb-2 border-2 border-gray-500" type="text" id="nom" pattern="[a-zA-Z ]*" placeholder="Nom" required>
    <label class="mb-2 font-bold" for="adresse">Adresse :</label>
    <input class="input mb-2 border-2 border-gray-500" type="text" id="adresse" pattern="[a-zA-Z ]*" placeholder="Adresse" required>
    <label class="mb-2 font-bold" for="ville">Ville :</label>
    <input class="input mb-2 border-2 border-gray-500" type="text" id="ville" pattern="[a-zA-Z ]*" placeholder="Ville" required>
    <label class="mb-2 font-bold" for="email">Email :</label>
    <input class="input mb-2 border-2 border-gray-500" type="email" id="email" name="email"  placeholder="exemple@gmail.com" required>
    <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold m-auto mt-10 w-full md:w-1/2" type="submit" id="submit">Confirmer la commande</button>
</form>`;
  getBasketId.appendChild(form);
}

// Récupération ID du formulaire 
const btnSendForm = document.getElementById("submit");

// Boucle pour récupérer les ID de chaque produits
const getProductId = () => {
  let products = [];
  for (let i = 0; i < basket.length; i++) {
    let idInBasket = basket[i]._id;
    products.push(idInBasket);
  }
  return products
};

// Fonction pour récupérer les valeurs du formulaire
const getFormData = () => {
  return {
    firstName: document.getElementById("prenom").value,
    lastName: document.getElementById("nom").value,
    address: document.getElementById("adresse").value,
    city: document.getElementById("ville").value,
    email: document.getElementById("email").value,
  };
};


// Fonction quand l'utilisateur va valider sa commande
const postOrder = (e) => {
  e.preventDefault();
  // Initialisation de ce qu'on va envoyer dans le POST
  let contact = getFormData();
  let products = getProductId()
  let body = { contact, products };
  fetch("http://localhost:3000/api/teddies/order", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log(responseData);
      // Ajout de l'orderId et du prix total dans le localstorage
      localStorage.setItem("orderId", responseData.orderId);
      localStorage.setItem("totalPrice", totalPrice);
      window.location.href = "./confirm.html";
    })
    .catch((error) => {
      alert("Veuillez remplir tous les champs");
    });
};

// La fonction postOrder s'execute quand on clique sur "Confirmer la commande"
btnSendForm.addEventListener("click", function (e) {
  postOrder(e);
});
