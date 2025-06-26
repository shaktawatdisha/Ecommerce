// import React, { useEffect } from 'react'
// import { useDispatch} from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { logout } from '../../redux/actions/userActions'

// const userLogout = () => {
//     console.log("logout component")
//     const dispatch = useDispatch()
//     const navigate = useNavigate
//     useEffect(()=>{
//         console.log("logout effect")
//         dispatch(logout())
//         navigate('/login')
//         console.log("navigated")
//     },[dispatch])
//   return (
//     <div>userLogout</div>
//   )
// }

// export default userLogout

import React from 'react'

const userLogout = () => {
  return (
    <div>userLogout</div>
  )
}

export default userLogout