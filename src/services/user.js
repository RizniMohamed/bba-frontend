import API from './api'

export const login = async (data) => {
    try {
        const response = await API.post("login",data)
        return response.data
    } catch (error) {
        throw error
    }
}