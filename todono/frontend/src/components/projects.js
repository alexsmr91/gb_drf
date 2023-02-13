import React from 'react'
import UserShort from './userName.js'
import { Link } from 'react-router-dom'

class PrjList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchString: "",
        }
    }

    prjItem(project) {
        let users = this.props.users
        let deleteProject = this.props.deleteProject
        let searchString = this.state.searchString.toLowerCase()
        if (searchString === "" || project.projectName.toLowerCase().indexOf(searchString) >= 0) {
            return (
                <tr>
                    <td>
                        <Link to={`/project/${project?.id}`}>{project?.projectName}</Link>
                    </td>
                    <td>
                        {project?.description}
                    </td>
                    <td>
                        {project.users.map((elem) => <UserShort user={users.filter((item) => item?.id == elem)[0]} />)}
                    </td>
                    <td>
                        <button onClick={() => deleteProject(project?.id)} type='button'>Delete</button>
                    </td>
                </tr>
            )
        } else { return "" }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }



    render() {
        let users = this.props.users
        let projects = this.props.projects
        let deleteProject = this.props.deleteProject
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <div className="form-group">
                        <label for="searchString">Поиск</label>
                        <input type="text" className="form-control" name="searchString"
                            value={this.state.searchString} onChange={(event) => this.handleChange(event)} />
                    </div>
                </form>
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
                        <th>
                            Действия
                        </th>
                    </thead>
                    {projects.map((elem) => this.prjItem(elem))}
                    <Link to='/projects/create'>Create</Link>

                </table>
            </div>
        )
    }
}
export default PrjList
