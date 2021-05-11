(async () => {
  const productId = getProductId();
  const productData = await getProductData(productId);
  hydratePage(productData);
})();

// Recupération de l'ID du produit sur laquel on a cliqué
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}

//Appel de l'api avec l'ID
function getProductData(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData);
}

// Mise en place du produit sur la page
function hydratePage(product) {
  document.getElementById("image").src = product.imageUrl;
  document.getElementById("name").innerHTML = product.name;
  document.getElementById("price").innerHTML = product.price / 100 + " €";
  document.getElementById("description").innerHTML = product.description;

  // Mise en place des couleurs
  let choice = document.getElementById("color");

  product.colors.forEach(function (colors) {
    let option = document.createElement("option");
    option.textContent = colors;
    choice.appendChild(option);
  });
  // Ajout button panier 
  const divApp = document.getElementById("button");

  var button = document.createElement("button");
  button.innerHTML = `Ajouter au panier ${product.name}`;
  button.className = "bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold"
  button.onclick = () => addTobasket(product);

  divApp.appendChild(button);


  // Creation d'un tableau si il n'y a pas d'élement dans le localstorage, sinon rajoute la quantité et le prix dans le local storage
  const addTobasket = (item) => {
    var oldBasket = JSON.parse(localStorage.getItem("basket")) || [];
    console.log(oldBasket.length);

    const found = oldBasket.find(({name}) => name === item.name)
    if (found) {
      found.quantity++,
      found.price = item.price * found.quantity
    } else {
      oldBasket.push({
      name: item.name,
       image: item.imageUrl,
       price: item.price,
       quantity: 1,
       _id: item._id
   })
  }
    console.log(oldBasket);
  // Ajout de l'article au local storage
    localStorage.setItem("basket", JSON.stringify(oldBasket));
    alert('Votre article a bien était ajouté au panier')
    document.location.reload()
  };
}
console.log(localStorage)
