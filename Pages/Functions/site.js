const menuItems = [
    {
        id: 1,
        name: 'Blåbärsbullar',
        price: 8.50,
        description: 'Classic Polish/Swedish bun with blueberries, egg, and vanillesauce.',
        category: 'Bun',
        picture: 'Pictures/blåbärsBullar.jpg', 
    },
    {
        id: 2,
        name: 'Bread',
        price: 6.75,
        description: 'Freshly baked bread with a crispy crust.',
        category: 'Bread',
        picture: 'Pictures/Bread.jpg',
    },
    {
        id: 3,
        name: 'Chocolate Cake',
        price: 120.00,
        description: 'Decadent chocolate cake with rich cocoa flavors.',
        category: 'Cake',
        picture: 'Pictures/CakeChocklad.jpg',
    },
    {
        id: 4,
        name: 'Meringue cake',
        price: 14.00,
        description: 'Delicate and fluffy meringue cake.',
        category: 'Cake',
        picture: 'Pictures/CakeMareng.jpg',
    },
    {
        id: 5,
        name: 'Lussebulle',
        price: 8.25,
        description: 'Traditional Swedish saffron bun with raisins.',
        category: 'Bun',
        picture: 'Pictures/Lussebulle.jpg',
    },
];

const menuElement = document.getElementById('menu-items');
const shoppingCart = [];
const cartElement = document.getElementById('shopping-cart');

function addItemToCart(selectedItem) {
    const existingItem = shoppingCart.find(item => item.id === selectedItem.id);

    if (existingItem) {
        existingItem.quantity++; 
    } else {
        selectedItem.quantity = 1; 
        shoppingCart.push(selectedItem);
    }

    displayCart(); 
}

function displayCart() {
    cartElement.innerHTML = '';

    shoppingCart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const itemName = document.createElement('p');
        itemName.textContent = `${item.name} x${item.quantity}`;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Price: ${item.price * item.quantity} kr`; 

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = 'Remove';
        decreaseButton.classList.add('remove-item');

        decreaseButton.addEventListener('click', function() {
            removeItemFromCart(item);
        });

        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(decreaseButton);

        cartElement.appendChild(cartItem);
    });
}

function createMenuItem(menuItem) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('menu-item');

    const itemName = document.createElement('h3');
    itemName.textContent = menuItem.name;

    const itemPrice = document.createElement('p');
    itemPrice.classList.add('price');
    itemPrice.textContent = `Price: ${menuItem.price} kr`;

    const itemDescription = document.createElement('p');
    itemDescription.innerHTML = `${menuItem.description}<br>Category: ${menuItem.category}`;

    const itemImage = document.createElement('img');
    itemImage.src = menuItem.picture;
    itemImage.alt = menuItem.name;
    itemImage.style.width = '180px';
    itemImage.style.height = 'auto';

    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add to Cart';
    addToCartButton.classList.add('add-to-cart');
    addToCartButton.style.backgroundColor = 'blue';
    addToCartButton.style.color = 'white';

    addToCartButton.addEventListener('click', function() {
        addItemToCart({ ...menuItem });
    });

    itemDiv.appendChild(itemName);
    itemDiv.appendChild(itemImage);
    itemDiv.appendChild(itemDescription);
    itemDiv.appendChild(itemPrice);
    itemDiv.appendChild(addToCartButton);

    return itemDiv;
}

menuItems.forEach(menuItem => {
    const itemDiv = createMenuItem(menuItem);
    menuElement.appendChild(itemDiv);
});

function removeItemFromCart(selectedItem) {
    const existingItem = shoppingCart.find(item => item.id === selectedItem.id);

    if (existingItem) {
        existingItem.quantity--; 

        if (existingItem.quantity === 0) {
            const index = shoppingCart.indexOf(existingItem);
            shoppingCart.splice(index, 1);
        }

        displayCart(); 
    }
}

const checkoutButton = document.getElementById('checkout-btn');

checkoutButton.addEventListener('click', function() {
    if (shoppingCart.length === 0) {
        alert('Please select an item first before purchasing.');
        return; 
    }

    const confirmation = confirm('Would you like to purchase the items?');

    if (confirmation) {
        const totalCost = shoppingCart.reduce((total, item) => total + item.price * item.quantity, 0);
        const purchasedItems = shoppingCart.map(item => `${item.name} x${item.quantity}`).join('\n');
        const message = `You purchased:\n${purchasedItems}\nTotal cost: ${totalCost.toFixed(2)} kr`;

        alert(message);

        shoppingCart.length = 0; 
        displayCart(); 
    }
});
