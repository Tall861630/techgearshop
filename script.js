// Redirections vers d'autres pages
document.getElementById('btn-connect').addEventListener('click', () => {
    window.location.href = 'login.html';
});

document.getElementById('btn-cart').addEventListener('click', () => {
    window.location.href = 'cart.html';
});

document.getElementById('btn-help').addEventListener('click', () => {
    window.location.href = 'help.html';
});

if (document.querySelector('.btn-back')) {
    document.querySelector('.btn-back').addEventListener('click', () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });
}

// Fonction pour mettre à jour la bulle avec le contenu réel du panier
function updateCartBubble() {
    const cartBubble = document.getElementById('cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Récupérer le panier du localStorage
    cartBubble.textContent = cart.length; // Afficher le nombre d'articles
}

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Charger le panier
    cart.push({ name: productName, price: productPrice }); // Ajouter le produit
    localStorage.setItem('cart', JSON.stringify(cart)); // Sauvegarder dans localStorage
    updateCartBubble(); // Mettre à jour la bulle
    alert(`${productName} a été ajouté au panier.`);
}

// Fonction pour afficher les produits du panier
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || []; // Charger le panier
    const cartContainer = document.getElementById('cart-container');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const shopButton = document.getElementById('shop-button');
    const totalPriceElement = document.getElementById('total-price');

    // Réinitialiser le contenu de la liste du panier
    cartContainer.innerHTML = '';
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        shopButton.innerText = 'Commencez Vos Achats';
        totalPriceElement.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        shopButton.innerText = 'Commandez Vos Produits';
        totalPriceElement.style.display = 'block';

        let totalPrice = 0;

        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <h4>${product.name}</h4>
                <p>${product.price}</p>
                <button onclick="removeFromCart(${index})">Supprimer</button>
            `;
            cartContainer.appendChild(productElement);

            const price = parseFloat(product.price.replace(/[^\d.-]/g, ''));
            totalPrice += price;
        });

        totalPriceElement.innerText = `Total: ${totalPrice.toLocaleString()} FCFA`;
    }

    updateCartBubble(); // Mise à jour après modification
}
// Initialiser le panier et la bulle au chargement de la page
window.onload = () => {
    updateCartBubble(); // Mettre à jour la bulle avec le nombre d'articles dans le panier
};



