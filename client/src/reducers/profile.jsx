const profileReducer = (state = {}, action) => {
    switch(action.type) {
        case 'GET_PROFILE': return action.profile;
        case 'DEL_PROFILE': return {};
        default: return state;
    }
}

export default profileReducer;