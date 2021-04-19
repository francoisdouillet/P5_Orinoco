(async () => {
  const productId = getProductId()
  const productData = await getProductData(productId)
  hydratePage(productData)
})()

function getProductId() {
  return new URL(window.location.href).searchParams.get('id')
}

function getProductData(productId) {
  return fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((httpBodyResponse) => httpBodyResponse.json())
    .then((productData) => productData)
}

function hydratePage(product) {
  document.getElementById('image').src = product.imageUrl
  document.getElementById('name').innerHTML = product.name
  document.getElementById('price').innerHTML = product.price
  document.getElementById('description').innerHTML = product.description

  let choice = document.getElementById("color")
    
    product.colors.forEach (function (colors) {
        let option = document.createElement("option")
        option.textContent = colors
        choice.appendChild(option)
    })
  }