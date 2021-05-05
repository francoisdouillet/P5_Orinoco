let teddiesSave = JSON.parse(localStorage.getItem('basket'))
console.log(teddiesSave)

const getBasketId = document.getElementById('basket');
const teddyDiv = document.createElement('div');
getBasketId.appendChild(teddyDiv);


if (teddiesSave == null || teddiesSave.length === 0) {
    const emptyBasket = document.createElement('p');
    getBasketId.appendChild(emptyBasket);
    emptyBasket.className = "text-center text-2xl font-bold";
    emptyBasket.textContent = "Votre panier est vide !"
} else {
    const emptyBasket = document.createElement('p');
    getBasketId.appendChild(emptyBasket);
    emptyBasket.className = "text-center text-2xl font-bold";
    emptyBasket.textContent = "Votre panier:"
    let i = 0
    for (teddiesSaves of teddiesSave) {
        // Creation de la div avec l'article
        const eachTeddy = document.createElement('div');
        getBasketId.appendChild(eachTeddy);
        eachTeddy.className = 'basketcard border-2 border-black flex p-3 mt-10 justify-between items-center';
        eachTeddy.id = i++
        
        const teddyCard = document.createElement('p');
        eachTeddy.appendChild(teddyCard);
        teddyCard.textContent = teddiesSaves.quantity + " x " + teddiesSaves.name;

        const teddyPrice = document.createElement('div');
        eachTeddy.appendChild(teddyPrice);
        teddyPrice.className = 'flex items-center';

        const price = document.createElement('p');
        teddyPrice.appendChild(price);
        price.textContent = teddiesSaves.price / 100 + " €"

        // Boutton pour supprimer l'article

        const deleteButton = document.createElement('button');
        teddyPrice.appendChild(deleteButton);
        deleteButton.className = 'basketbutton p-2 ml-2';

        const iconButton = document.createElement('i');
        deleteButton.appendChild(iconButton);
        iconButton.className = 'fas fa-trash-alt';
    }
    // Supression de l'article du local storage
    let trashButton = document.getElementsByClassName('basketbutton');
        for (let i = 0 ; i < trashButton.length; i++) {
            trashButton[i].addEventListener('click' , function (event) { 
                event.preventDefault();
                let id = this.closest('.basketcard').id;
                
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
    form.innerHTML = `<form class="p-6 m-auto flex flex-col" id="form" name="userInput" onsubmit="submitInfo()" action="order.html">
    <label class="mb-2 font-bold" for="prenom">Prénom :</label>
    <input class="mb-2" type="text" id="prenom" pattern="[a-zA-Z ]*" placeholder="Prénom" required>
    <label class="mb-2 font-bold" fpr="nom">Nom :</label>
    <input class="mb-2" type="text" id="nom" pattern="[a-zA-Z ]*" placeholder="Nom" required>
    <label class="mb-2 font-bold" for="adress">Adresse :</label>
    <input class="mb-2" type="text" id="adress" pattern="[a-zA-Z ]*" placeholder="Adresse" required>
    <label class="mb-2 font-bold" for="city">Ville :</label>
    <input class="mb-2" type="text" id="city" pattern="[a-zA-Z ]*" placeholder="Ville" required>
    <label class="mb-2 font-bold" for="email">Email :</label>
    <input class="mb-2" type="text" id="email" type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" placeholder="exemple@gmail.com" required>
    <button class="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold m-auto mt-10 w-full md:w-1/2" type="submit" id="submit">Confirmer la commande</button>
</form>`
    getBasketId.appendChild(form);
}