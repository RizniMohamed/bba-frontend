import API from './api'

export const getShopBySeller = async (userID) => {
    try {
        const response = await API.get(`shop/${userID}`)
        return response.data
    } catch (error) {
        throw error
    }
}


export const getShops = async () => {
    try {
        const response = await API.get(`shop`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const upadateShop = async (shopID, data) => {
    try {
        const response = await API.put(`shop/${shopID}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteShop = async (shopID) => {
    try {
        const response = await API.delete(`shop/${shopID}`)
        return response.data
    } catch (error) {
        throw error
    }
}
