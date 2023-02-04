import API from './api'

export const getLineChart = async (data) => {
    console.log(data.userID);
    try {
        const response = await API.post(`dashboard/linechart?userID=${data.userID}`,data)
        return response.data
    } catch (error) {
        throw error
    }
}