const initState = {
    loading: false
}

const Login = (state = initState, action) =>{

    const { loading } = action

    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading
            }
        default:
            return state
    }
}

export default Login
