import API from './api'

export const login = async (data) => {
    try {
        const response = await API.post("login",data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const signup = async (data) => {
    try {
        const response = await API.post("signup", data)
        return response.data
    } catch (error) {
        throw error
    }
}

