import React from 'react'
import UserShort from './userName.js'
import { Link } from 'react-router-dom'


const NoteItem = ({ note, users, projects, deleteNote }) => {
    const user = users.filter((item) => item?.id == note?.owner)[0]
    const project = projects.filter((item) => item?.id == note?.project)[0]
    if (note?.active) {
        return (
            <tr>
                <td>
                    <Link to={`/note/${note?.id}`}>{note?.title}</Link>
                </td>
                <td>
                    {note?.text}
                </td>
                <td>
                    <Link to={`/project/${project?.id}`}>{project?.projectName}</Link>
                </td>
                <td>
                    <UserShort user={user} />
                </td>
                <td>
                    {note?.created}
                </td>
                <td>
                    {note?.updated}
                </td>
                <td>
                    {note?.deadLine}
                </td>
                <td>
                    <button onClick={() => deleteNote(note?.id)} type='button'>Delete</button>
                </td>
            </tr>
        )
    }
}

const NotesList = ({ users, projects, notes, deleteNote }) => {
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
                <th>
                    Действия
                </th>
            </thead>
            {notes.map((elem) => <NoteItem note={elem} users={users} projects={projects} deleteNote={deleteNote} />)}
            <Link to='/notes/create'>Create</Link>
        </table>
    )
}

export default NotesList
