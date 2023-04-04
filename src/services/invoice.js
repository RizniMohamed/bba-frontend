import API from "./api"


export const getInvoiceByShop = async (shopID) => {
    try {
        const response = await API.get(`invoice/${shopID}`)
        return response.data
    } catch (error) {
        throw error
    }
}