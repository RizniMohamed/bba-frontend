import API from './api'

export const createTS = async (data) => {
    try {
        const response = await API.post("timesheet",data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getTS = async (query) => {
    try {
        const response = await API.get(`timesheet?${query}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const deleteTS = async (id) => {
    try {
        const response = await API.delete(`timesheet/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}


export const updateTS = async (data) => {
    console.log(data);
    try {
        const response = await API.patch(`timesheet/${data.id}`,data)
        return response.data
    } catch (error) {
        throw error
    }
}