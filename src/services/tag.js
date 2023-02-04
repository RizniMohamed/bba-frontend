import API from './api'

export const createTag = async (data) => {
    try {
        const response = await API.post("tag",data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getTags = async (query) => {
    try {
        const response = await API.get(`tag?${query}`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteTags = async (id) => {
    try {
        const response = await API.delete(`tag/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}


export const updateTag = async (data) => {
    console.log(data);
    try {
        const response = await API.patch(`tag/${data.id}`,data)
        return response.data
    } catch (error) {
        throw error
    }
}