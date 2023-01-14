import { SERVER } from '../config/global'

export const getLines = (filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'GET_LINES',
    payload: async () => {
      const response = await fetch(`${SERVER}/lines?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const addLine = (line, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'ADD_LINE',
    payload: async () => {
      let response = await fetch(`${SERVER}/lines`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(line)
      })
      response = await fetch(`${SERVER}/lines?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const saveLine = (id, line, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'SAVE_LINE',
    payload: async () => {
      let response = await fetch(`${SERVER}/lines/${id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(line)
      })
      response = await fetch(`${SERVER}/lines?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}

export const deleteLine = (id, filterString, page, pageSize, sortField, sortOrder) => {
  return {
    type: 'DELETE_LINE',
    payload: async () => {
      let response = await fetch(`${SERVER}/lines/${id}`, {
        method: 'delete'
      })
      response = await fetch(`${SERVER}/lines?${filterString}&sortField=${sortField || ''}&sortOrder=${sortOrder || ''}&page=${page || ''}&pageSize=${pageSize || ''}`)
      const data = await response.json()
      return data
    }
  }
}
