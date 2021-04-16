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
  document.getElementById('image').innerHTML = `<img class="image" src="${product.imageUrl}">`
  document.getElementById('name').innerHTML = product.name
  document.getElementById('price').innerHTML = product.price
  document.getElementById('description').innerHTML = product.description
  document.getElementById('color').style.gridTemplateColumns = `repeat(${product.colors.length}, 1fr)`

  // Get parent element
  const colorsElt = document.getElementById('color')

  // Display all colors
  product.colors.forEach((color) => {
    // Get & clone template for one color
    const templateElt = document.getElementById('productColor')
    const cloneElt = document.importNode(templateElt.content, true)

    // Hydrate color clone
    cloneElt.querySelector('div').style.backgroundColor = color

    // Display a new color
    colorsElt.appendChild(cloneElt)
  })
}

