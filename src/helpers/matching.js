const getMatches = (state, id) => {
        return state.products.filter(product => product.id === id)
}

export { getMatches }