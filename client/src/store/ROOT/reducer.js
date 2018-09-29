const initState = {
    ROOT_loading: false,
    ROOT_userInfo: {
        name: ''
    }
}
const ROOT = (state = initState , action) =>{

    const { ROOT_loading, ROOT_userInfo } = action

    switch (action.type) {
        case 'ROOT_LOADING':
            return {
                ...state,
                ROOT_loading
            }

        case 'ROOT_USERINFO':
            return {
                ...state,
                ROOT_userInfo
            }

        default:
            return state
    }
}

export default ROOT



