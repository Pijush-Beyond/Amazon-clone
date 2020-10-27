export const intialState = {
    cart:[]
}

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART': return {
            ...state,
            cart:[...state.cart,action.item]
        }
        case 'REMOVE_FROM_CART': return {
            ...state,
            cart: state.cart.filter(item=>{return item!==action.item})
        }
        default: return state
    }
}