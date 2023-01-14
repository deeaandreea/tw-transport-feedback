import { SERVER } from '../config/global'

export const getExperiences = (filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'GET_EXPERIENCES',
    payload: async () => {
      const response = await fetch(`${SERVER}/experiences?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const addExperience = (experience, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'ADD_EXPERIENCE',
    payload: async () => {
      let response = await fetch(`${SERVER}/experiences`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(experience)
      })
      response = await fetch(`${SERVER}/experiences?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const saveExperience = (id, experience, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'SAVE_EXPERIENCE',
    payload: async () => {
      let response = await fetch(`${SERVER}/experiences/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(experience)
      })
      response = await fetch(`${SERVER}/experiences?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const deleteExperience = (id, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'DELETE_EXPERIENCE',
    payload: async () => {
      let response = await fetch(`${SERVER}/experiences/${id}`, {
        method: 'delete'
      })
      response = await fetch(`${SERVER}/experiences?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}
