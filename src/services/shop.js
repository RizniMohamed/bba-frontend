import API from './api'

export const getShopBySeller = async (userID) => {
    try {
        const response = await API.get(`shop/${userID}`)
        return response.data
    } catch (error) {
        throw error
    }
}