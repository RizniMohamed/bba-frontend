import API from "./api"


export const getInvoiceByShop = async (shopID) => {
    try {
        const response = await API.get(`invoice/${shopID}`)
        return response.data
    } catch (error) {
        throw error
    }
}



export const getInvoiceByUser = async (shopID,userID) => {
    try {
        const response = await API.get(`invoice/${shopID}/${userID}`)
        return response.data
    } catch (error) {
        throw error
    }
}