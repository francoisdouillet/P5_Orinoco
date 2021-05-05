(async () => {
  const productId = getProductId();
  const productData = await getProductData(productId);
  hydratePage(productData);
})();

function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}

function getProductData(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData);
}

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
  button.onclick = () => addTobasket(product);

  divApp.appendChild(button);

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
       quantity: 1
   })
  }
    console.log(oldBasket);
  
    localStorage.setItem("basket", JSON.stringify(oldBasket));
    alert('Votre article a bien était ajouté au panier')
  };
}
console.log(localStorage)
