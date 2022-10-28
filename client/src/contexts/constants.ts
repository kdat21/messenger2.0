export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "url that deployed";

export const SET_AUTH = 'SET_AUTH'
export const SET_LOG_OUT_AUTH = 'SET_LOG_OUT_AUTH'
export const GET_PEOPLE = 'GET_PEOPLE'

export const GET_CONVERSATIONS = 'GET_CONVERSATIONS'
export const FIND_CONVERSATION = 'FIND_CONVERSATION'
export const CREATE_CONVERSATION = 'CREATE_CONVERSATION'

export const SET_CONVERSATION_LOADING = 'SET_CONVERSATION_LOADING'
export const GET_CONVERSATION_CONTENT = 'GET_CONVERSATION_CONTENT'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SET_LAST_MESSAGE = 'SET_LAST_MESSAGE'
