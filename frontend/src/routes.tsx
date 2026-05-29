const BASE_URL = 'http://localhost:8000'

function addBaseUrl(path) {
    return `${BASE_URL}${path}`
}

// ===========================
// GET
// ===========================
const GET_ALL_USERS = addBaseUrl(`/users`)
const GET_IS_GAME_RUNNING = addBaseUrl(`/is_game_running`)
const GET_USER_CHARACTERS = addBaseUrl(`/user_characters`)


// ===========================
// POST
// ===========================

const INSERT_USER = addBaseUrl(`/insert_user`)
const START_GAME = addBaseUrl(`/start_game`)
const STOP_GAME = addBaseUrl(`/stop_game`)
const SET_USER_CHARACTERS = addBaseUrl(`/set_user_characters`)

export {
    GET_ALL_USERS,
    GET_IS_GAME_RUNNING,
    GET_USER_CHARACTERS,
    INSERT_USER,
    START_GAME,
    STOP_GAME,
    SET_USER_CHARACTERS,
}