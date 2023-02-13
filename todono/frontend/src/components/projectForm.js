import React from 'react'
import UserListBox from './userListBox.js'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projectName: '',
            description: '',
            url: '',
            users: []
        }
    }
    handleChange(event) {
        if (event.target.name === "users") {
            let users = this.state.users
            let userId = event.target.options[event.target.selectedIndex].id
            if (event.target.value !== "") {
                if (users.indexOf(userId) !== -1) {
                    users = users.filter((item) => item !== userId)
                } else { users = [...users, userId] }
            } else { users = [] }
            document.getElementById('selected').innerText = users.join(", \n")
            this.setState(
                {
                    [event.target.name]: users
                }
            )
        } else {
            this.setState(
                {

                    [event.target.name]: event.target.value
                }
            );
        }
    }
    handleSubmit(event) {
        this.props.createProject(this.state.projectName, this.state.description, this.state.url, this.state.users)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="projectName">Название</label>
                    <input type="text" className="form-control" name="projectName"
                        value={this.state.projectName} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="description">Описание</label>
                    <input type="text" className="form-control" name="description"
                        value={this.state.description} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="url">Ссылка</label>
                    <input type="text" className="form-control" name="url"
                        value={this.state.url} onChange={(event) => this.handleChange(event)} />
                </div>

                <div className="form-group">

                    <label for="users">Ответственные</label>
                    <UserListBox users={this.props.users} handleChange={(event) => this.handleChange(event)} />
                    <p id='selected'></p>
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default ProjectForm
