import React from 'react'


const UserItem = ({ user }) => {
    return (
        <tr>
            <td>
                {user.email}
            </td>
            <td>
                {user.userName}
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
