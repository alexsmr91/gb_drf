import React from 'react'
import { useParams } from 'react-router-dom'
import UserShort from './userName.js'


const Project = ({ projects }) => {
    let { id } = useParams()
    let prj = projects.filter((item) => item.id == id)
    prj = prj[0]

    return (
        <div>
            <h2>Название</h2>
            {prj.projectName}
            <h2>Описание</h2>
            {prj.description}
            <h2>Пользователи</h2>
            {prj.users.map((elem) => <UserShort user={elem} />)}
        </div>

    )
}

export default Project
