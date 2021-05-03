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
    // Supression de l'article du local storage
    let trashButton = document.getElementsByClassName('basket__card--button');
        for (let i = 0 ; i < trashButton.length; i++) {
            trashButton[i].addEventListener('click' , function (event) { 
                event.preventDefault();
                let id = this.closest('.basket__card').id;
                
                //on supprime l'article du localStorage
                teddiesSave.splice(id, 1);

                //on enregistre le nouveau localStorage
                localStorage.setItem('basket', JSON.stringify(teddiesSave));
                JSON.parse(localStorage.getItem('basket')); 
                window.location.href = "cart.html";
            }); 
        };

    // Formulaire de renseignement 
    const form = document.createElement("div")
    form.innerHTML = `<form class="form" id="form" name="userInput" onsubmit="submitInfo()" action="order.html">
    <label class="form__label" for="prenom">Prénom :</label>
    <input class="form__input" type="text" id="prenom" pattern="[a-zA-Z ]*" placeholder="Prénom" required>
    <label class="form__label" fpr="nom">Nom :</label>
    <input class="form__input" type="text" id="nom" pattern="[a-zA-Z ]*" placeholder="Nom" required>
    <label class="form__label" for="adress">Adresse :</label>
    <input class="form__input" type="text" id="adress" pattern="[a-zA-Z ]*" placeholder="Adresse" required>
    <label class="form__label" for="city">Ville :</label>
    <input class="form__input" type="text" id="city" pattern="[a-zA-Z ]*" placeholder="Ville" required>
    <label class="form__label" for="email">Email :</label>
    <input class="form__input" type="text" id="email" type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="exemple@gmail.com" required>
    <button class="form__confirm" type="submit" id="submit">Confirmer la commande</button>
</form>`
    getBasketId.appendChild(form);
}