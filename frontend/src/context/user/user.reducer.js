

const initialState = {

}

const userReducer = (state = initialState, action) => {
    console.log("reducer", action.payload)
    switch (action.type) {
        
        case "AUTH_REQUEST":
            
            return {
                ...state,
                ...action.payload
            }
        case "AUTH_SUCCESS":
            return {
                ...state,
                ...action.payload
            }
        case "AUTH_ERROR":
            return { 
                ...state,
                ...action.payload
            }
        case "AUTH_LOGOUT":
            return { 
                ...state,
                ...action.payload
            }
        default:
            return state
        
    }
}
export default userReducer;