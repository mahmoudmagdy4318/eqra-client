
import axiosIntance from '../../API/axiosInstance';

export async function getFollows() {
    return await axiosIntance.get('/api/persons-i-follow');
}


