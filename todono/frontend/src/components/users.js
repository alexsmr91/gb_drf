import React from 'react'
import { Link } from 'react-router-dom'


const UserItem = ({ user }) => {
    return (
        <tr>

            <td>
                <Link to={`user/${user.id}`}>{user.userName} </Link>
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.birthday}
            </td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <thead>
                <th>
                    Username
                </th>
                <th>
                    E-mail
                </th>
                <th>
                    Имя
                </th>
                <th>
                    Фамилия
                </th>
                <th>
                    ДР
                </th>
            </thead>
            {users.map((elem) => <UserItem user={elem} />)}

        </table>

    )
}

export default UserList 
