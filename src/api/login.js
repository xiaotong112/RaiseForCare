import { get, post, put, del, upload } from '../utils/request'

export const login = (data) => {
	return post('/user/login', data)
}
export default {
    login
}