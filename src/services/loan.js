import API from "./api"

export const getLoanBySeller = async (userID) => {
    try {
        const response = await API.get(`loan/${userID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const createLoan = async (data) => {
    try {
        const response = await API.post(`loan`,data)
        return response.data
    } catch (error) {
        throw error
    }
}