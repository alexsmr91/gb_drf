import React from 'react'

class UserListBox extends React.Component {


    userItem(user) {
        return (
            <option id={user.id} >{user.firstName} {user.lastName}</ option>
        )
    }


    render() {
        let users = this.props.users
        return (
            <select id="users" name="users" size="10" multiple="multiple" onChange={(event) => this.props.handleChange(event)}>

                {users.map((elem) => this.userItem(elem))}

            </select >

        )
    }
}
export default UserListBox