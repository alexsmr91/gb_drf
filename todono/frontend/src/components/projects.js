import React from 'react'
import UserShort from './userName.js'
import { Link } from 'react-router-dom'


const PrjItem = ({ prj }) => {
    return (
        <tr>
            <td>
                <Link to={`/project/${prj.id}`}>{prj.projectName}</Link>
            </td>
            <td>
                {prj.description}
            </td>
            <td>
                {prj.users.map((elem) => <UserShort user={elem} />)}
            </td>
        </tr>
    )
}

const PrjList = ({ projects }) => {
    return (
        <table>
            <thead>
                <th>
                    Название
                </th>
                <th>
                    Описание
                </th>
                <th>
                    Пользователи
                </th>
            </thead>
            {projects.map((elem) => <PrjItem prj={elem} />)}

        </table>
    )
}

export default PrjList
