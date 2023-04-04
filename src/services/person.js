import API from "./api"

export const getPersonByID = async (personID) => {
    try {
        const response = await API.get(`person/${personID}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getAllPersons = async () => {
    try {
        const response = await API.get(`person`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const upadatePerson = async (personID, data) => {
    try {
        const response = await API.put(`person/${personID}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const upadatePass = async (personID, data) => {
    try {
        const response = await API.put(`person/pass/${personID}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deletePerson = async (personID) => {
    try {
        const response = await API.delete(`person/${personID}`)
        return response.data
    } catch (error) {
        throw error
    }
}
