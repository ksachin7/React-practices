export const addToCart = (product) => ({
    type: 'ADD_TO_CART',
    payload: product,
});

export const removeFromCart = (product) => ({
    type: 'REMOVE_FROM_CART',
    payload: product,
});

export const incrementQuantity = (productId) => ({
    type: 'INCREMENT_QUANTITY',
    payload: productId,
});

export const decrementQuantity = (productId) => ({
    type: 'DECREMENT_QUANTITY',
    payload: productId,
});

export const toggleCart = () => ({
    type: 'TOGGLE_CART',
});
