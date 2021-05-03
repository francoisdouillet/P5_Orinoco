let teddiesSave = JSON.parse(localStorage.getItem('basket'))
console.log(teddiesSave)

const getBasketId = document.getElementById('basket');
const teddyDiv = document.createElement('div');
getBasketId.appendChild(teddyDiv);

if (teddiesSave == null || teddiesSave.length === 0) {
    const emptyBasket = document.createElement('p');
    getBasketId.appendChild(emptyBasket);
    emptyBasket.className = "basket__empty";
    emptyBasket.textContent = "Votre panier est vide !"
} else {
    const emptyBasket = document.createElement('p');
    getBasketId.appendChild(emptyBasket);
    emptyBasket.className = "basket__empty";
    emptyBasket.textContent = "Votre panier:"
    let i = 0
    for (teddiesSaves of teddiesSave) {
        // Creation de la div avec l'article
        const eachTeddy = document.createElement('div');
        getBasketId.appendChild(eachTeddy);
        eachTeddy.className = 'basket__card';
        eachTeddy.id = i++
        
        const teddyCard = document.createElement('p');
        eachTeddy.appendChild(teddyCard);
        teddyCard.textContent = teddiesSaves.quantity + " x " + teddiesSaves.name;

        const teddyPrice = document.createElement('div');
        eachTeddy.appendChild(teddyPrice);
        teddyPrice.className = 'basket__card--price';

        const price = document.createElement('p');
        teddyPrice.appendChild(price);
        price.textContent = teddiesSaves.price / 100 + " €"

        // Boutton pour supprimer l'article

        const deleteButton = document.createElement('button');
        teddyPrice.appendChild(deleteButton);
        deleteButton.className = 'basket__card--button';

        const iconButton = document.createElement('i');
        deleteButton.appendChild(iconButton);
        iconButton.className = 'fas fa-trash-alt';
    }
}