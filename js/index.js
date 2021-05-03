(async function () {
  const articles = await getArticles();

  for (article of articles) {
    displayArticle(article);
  }
})();

function getArticles() {
  return fetch("http://localhost:3000/api/teddies")
    .then(function (httpBodyResponse) {
      return httpBodyResponse.json();
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}

function displayArticle(article) {
  const templateElt = document.getElementById("templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("name").innerHTML = article.name;
  cloneElt.getElementById("price").innerHTML = article.price / 100 + " €";
  cloneElt.getElementById("image").src = article.imageUrl;
  cloneElt.getElementById("description").innerHTML = article.description;
  cloneElt.getElementById(
    "mainArticle"
  ).href = `product.html?id=${article._id}`;

  document.getElementById("main").appendChild(cloneElt);
}
