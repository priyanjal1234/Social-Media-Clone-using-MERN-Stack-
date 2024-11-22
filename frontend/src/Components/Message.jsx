import React from 'react'
import { Link } from 'react-router-dom'

function Message({resetUrl,resettoken}) {
  return (
    <span>Go to this link: <Link className='text-blue-600 block ml-3' to={`/reset-password/${resettoken}`}>{resetUrl}</Link></span>
  )
}

export default Message
