import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/users.js'
import Footer from './components/footer.js'
import Menu from './components/menu.js'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': []
        }
    }
    componentDidMount() {
        /*const users = [
                {
                    'email':'e@ma.il',
                    'username':'user1990',
                    'first_name': 'User',
                    'last_name': 'Usersss',
                    'birthday': "01.01.1990"
                },
                {
                    'email':'l@am.er',
                    'username':'admin666',
                    'first_name': 'Admin',
                    'last_name': 'Adminsss',
                    'birthday': "01.07.1991"
                },
        ]
        this.setState(
        {
            'users': users
        }
        )*/
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                <Menu />
                <UserList users={this.state.users} />
                <Footer />
            </div>
        )
    }
}

export default App;
