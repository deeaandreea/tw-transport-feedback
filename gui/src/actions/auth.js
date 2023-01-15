import { SERVER } from '../config/global'

// TODO logout(), getCurrentUser()

export const login = (username1, password1) => {
    console.log('Username '+username1 + ' password '+password1)
    const body1 = JSON.stringify({ username: username1, password: password1 })
    console.log(body1)
    return {
        type: 'LOGIN',
        payload: async () => {
            let response = await fetch(`${SERVER}/auth/login`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body1
            })
            const data = await response.json()
            console.log('Username: ' + data.username)
            const token = data.token
            console.log('Token: ' + token)
            return data
        }
    }
}

export const register = (userData) => {
    console.log('Username ' + userData.username + ' password ' + userData.password)
    const body = JSON.stringify(userData)
    return {
        type: 'REGISTER',
        payload: async () => {
            let response = await fetch(`${SERVER}/auth/register`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            })
            const data = await response.json()
            return data
        }
    }
}
