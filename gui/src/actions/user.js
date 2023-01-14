import { SERVER } from '../config/global'

export const getUsers = (filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'GET_USERS',
    payload: async () => {
      const response = await fetch(`${SERVER}/users?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const addUser = (user, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'ADD_USER',
    payload: async () => {
      let response = await fetch(`${SERVER}/users`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      response = await fetch(`${SERVER}/users?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const saveUser = (id, user, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'SAVE_USER',
    payload: async () => {
      let response = await fetch(`${SERVER}/users/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      response = await fetch(`${SERVER}/users?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const deleteUser = (id, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'DELETE_USER',
    payload: async () => {
      let response = await fetch(`${SERVER}/users/${id}`, {
        method: 'delete'
      })
      response = await fetch(`${SERVER}/users?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}
