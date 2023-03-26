import API from './api'

export const createProduct = async (data) => {
    try {
        const response = await API.post("product",data)
        return response.data
    } catch (error) {
        throw error
    }
}


export const getProductsByShop = async (shopID) => {
    try {
        const response = await API.get(`product/${shopID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteProduct = async (ProductID) => {
    try {
        const response = await API.delete(`product/${ProductID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const upadateProduct = async (ProductID, data) => {
    try {
        const response = await API.put(`product/${ProductID}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}