export const ROOT_ChangeLoading = (loading) =>(
    {
        type:'ROOT_LOADING',
        ROOT_loading:loading
    }
)

export const ROOT_DelayLoading = () => {
    return (dispatch, getState) =>{
        let timer = null
        timer = setTimeout(() =>{
            dispatch(ROOT_ChangeLoading(false))
            clearTimeout(timer)
        },500)
    }
}

export const ROOT_ChangeUser = (userInfo) =>(
    {
        type:'ROOT_USERINFO',
        ROOT_userInfo:userInfo
    }
)
