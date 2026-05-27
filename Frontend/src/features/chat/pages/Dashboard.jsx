import React from 'react'
import {useSelector} from 'react-redux'

const dashboard = () => {

  const {user} = useSelector((state) => state.auth)
  console.log(user)

  return (
    <div>
      <h1>Welcome to the Dashboard, {user.username}!</h1>
    </div>
  )
}

export default dashboard
