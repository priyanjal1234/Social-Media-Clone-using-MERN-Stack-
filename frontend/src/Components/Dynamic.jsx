import React from 'react'
import { useParams } from 'react-router-dom'
import Profile from './Profile'
import ProtectedRoute from './ProtectedRoute'
import CreatePost from './CreatePost'
import AllUsers from './AllUsers'

function Dynamic() {
    let {item} = useParams()
    if(item.toString() === "profile") {
        return <ProtectedRoute><Profile /></ProtectedRoute>
    } 
    else if(item.toString() === "create-post") {
        return <CreatePost />
    }
    else if(item.toString() === "all-users") {
        return <AllUsers />
    }
}

export default Dynamic
