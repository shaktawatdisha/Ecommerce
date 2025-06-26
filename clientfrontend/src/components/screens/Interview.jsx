import React, { useState } from 'react'

const Interview = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ name:"disha", email:"disha@gmail.com"})

  const handleLogin =()=>{
    setIsAuthenticated(true)
    setUser({name:"disha", email:"disha@gmail.com"})
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser({})
  }
  return (
    <>
    {isAuthenticated?(
      <div>Welcome {user.name}
      <button onClick={handleLogout}>logout</button>
      </div>
    ):
    <div>
      <button onClick={handleLogin}>login</button>
      </div>}
    
    </>
  )
}

export default Interview