$(document).ready(function() {
    // Function to handle adding items to the cart
    $('.add-to-cart').click(function(e) {
        e.preventDefault(); // Prevent default link behavior

        const product = $(this).closest('.product');
        const imgSrc = product.find('img').attr('src');
        const title = product.find('h3').text();
        const price = product.find('p').text();

        // Check if the product is already in the cart
        let cartItem = $('#cartItemsContainer').find(`.cart-item[data-title="${title}"]`);
        if (cartItem.length > 0) {
            let quantity = parseInt(cartItem.attr('data-quantity')) + 1;
            cartItem.find('.cart-item-quantity').text(`Quantity: ${quantity}`);
            cartItem.attr('data-quantity', quantity);
        } else {
            const cartItemHtml = `
                <div class="cart-item" data-title="${title}" data-quantity="1">
                    <img src="${imgSrc}" alt="${title}">
                    <div>
                        <h4>${title}</h4>
                        <p>${price}</p>
                        <p class="cart-item-quantity">Quantity: 1</p>
                    </div>
                    <button class="remove-from-cart">Remove</button>
                </div>
            `;

            const cartItemsContainer = $('#cartItemsContainer');
            if (cartItemsContainer.find('p.mb-0').length) {
                cartItemsContainer.empty();
            }

            cartItemsContainer.append(cartItemHtml);
        }
    });

    // Function to remove items from the cart
    $('#cartItemsContainer').on('click', '.remove-from-cart', function(e) {
        e.stopPropagation(); // Prevent event from propagating to parent elements
        $(this).closest('.cart-item').remove();
        
        // If the cart is empty, display a message
        const cartItemsContainer = $('#cartItemsContainer');
        if (!cartItemsContainer.children().length) {
            cartItemsContainer.html('<p class="mb-0">No items in cart.</p>');
        }
    });
});
