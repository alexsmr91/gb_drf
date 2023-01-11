import React from 'react'


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.email}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstname}
            </td>
            <td>
                {user.lastname}
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
            <th>
                E-mail
            </th>
            <th>
                Username
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
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UserList
