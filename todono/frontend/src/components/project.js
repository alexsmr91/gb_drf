import React from 'react'
import { useParams } from 'react-router-dom'
import UserShort from './userName.js'


const Project = ({ projects, users }) => {
    let { id } = useParams()
    let project = projects.filter((item) => item?.id == id)[0]
    return (
        <div>
            <h2>Название</h2>
            {project?.projectName}
            <h2>Описание</h2>
            {project?.description}
            <h2>Пользователи</h2>
            {project?.users.map((elem) => <UserShort user={users.filter((item) => item?.id == elem)[0]} />)}
        </div>

    )
}

export default Project
