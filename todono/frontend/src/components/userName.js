import React from 'react'
import { Link } from 'react-router-dom'


const UserShort = ({ user }) => {
    return (
        <Link to={`/user/${user.id}`}>{user.firstName} {user.lastName}, </Link>
    )
}

export default UserShort
