const initialState = {
    isLogged: false,
    username: 'NIKOLA',
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGGED': 
            return {
                ...state,
                isLogged:  true
            }
        default: return state
    }
}

export default userReducer;