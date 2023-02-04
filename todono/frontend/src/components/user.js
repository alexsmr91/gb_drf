import React from 'react'
import { useParams } from 'react-router-dom'


const User = ({ users }) => {
    let { id } = useParams()
    let user = users.filter((item) => item.id == id)
    user = user[0]
    return (
        <div>
            <h2>Имя</h2>
            {user.firstName}
            <h2>Фамилия</h2>
            {user.lastName}
            <h2>Никнэйм</h2>
            {user.username}
            <h2>Почта</h2>
            {user.email}
            <h2>ДР</h2>
            {user.birthday}
        </div>

    )
}

export default User
