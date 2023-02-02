import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


const active = {
    true: 'ДА',
    false: 'НЕТ'
}

const Note = ({ notes }) => {
    let { id } = useParams()
    let note = notes.filter((item) => item.id == id)
    note = note[0]
    return (
        <div>
            <h2>Название</h2>
            {note.title}
            <h2>Текст задания</h2>
            {note.text}
            <h2>В работе</h2>
            {active[note.active]}
            <h2>Проект</h2>
            <Link to={`/project/${note.project.id}`}>{note.project.projectName}</Link>
            <h2>Создал пользователь</h2>
            <Link to={`/user/${note.owner.id}`}>{note.owner.firstName} {note.owner.lastName}</Link>
            <h2>Дата создания</h2>
            {note.created}
            <h2>Дата изменения</h2>
            {note.updated}
            <h2>Дедлайн</h2>
            {note.deadLine}
        </div>

    )
}

export default Note
