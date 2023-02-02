import React from 'react'
import UserShort from './userName.js'
import { Link } from 'react-router-dom'


const active = {
    true: 'ДА',
    false: 'НЕТ'
}

const NoteItem = ({ note }) => {
    return (
        <tr>
            <td>
                <Link to={`/note/${note.id}`}>{note.title}</Link>
            </td>
            <td>
                {note.text}
            </td>
            <td>
                {active[note.active]}
            </td>
            <td>
                <Link to={`/project/${note.project.id}`}>{note.project.projectName}</Link>
            </td>
            <td>
                <UserShort user={note.owner} />
            </td>
            <td>
                {note.created}
            </td>
            <td>
                {note.updated}
            </td>
            <td>
                {note.deadLine}
            </td>
        </tr>
    )
}

const NotesList = ({ notes }) => {
    return (
        <table>
            <thead>
                <th>
                    Название
                </th>
                <th>
                    Текст задания
                </th>
                <th>
                    В работе
                </th>
                <th>
                    Проект
                </th>
                <th>
                    Создал пользователь
                </th>
                <th>
                    Дата создания
                </th>
                <th>
                    Дата изменения
                </th>
                <th>
                    Дедлайн
                </th>
            </thead>
            {notes.map((elem) => <NoteItem note={elem} />)}
        </table>
    )
}

export default NotesList
