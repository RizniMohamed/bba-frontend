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
        const response = await API.post(`loan`, data)
        return response.data
    } catch (error) {
        throw error
    }
}


export const deleteLoan = async (loanID) => {
    try {
        const response = await API.delete(`loan/${loanID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const upadateLoan = async (loanID, data) => {
    try {
        const response = await API.put(`loan/${loanID}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}