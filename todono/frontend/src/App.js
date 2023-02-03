import React from 'react';
import './App.css';
import UserList from './components/users.js'
import PrjList from './components/projects.js'
import NotesList from './components/notes.js'
import Footer from './components/footer.js'
import Project from './components/project.js'
import User from './components/user.js'
import Note from './components/note.js'
import LoginForm from './components/login.js'
import axios from 'axios'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': '',
            'username': '',
        }
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/users', { headers })
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects', { headers })
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/notes', { headers })
            .then(response => {
                const notes = response.data.results
                this.setState(
                    {
                        'notes': notes
                    }
                )
            }).catch(error => console.log(error))

    }

    set_token(token, username) {
        const cookies = new Cookies()
        cookies.set('token', token, { path: '/', maxAge: 2592000 })
        cookies.set('username', username, { path: '/', maxAge: 2592000 })
        this.setState({
            'token': token,
            'username': username
        }, () => this.load_data())

    }
    is_authenticated() {
        return (this.state.token != '' && this.state.token != undefined)
    }
    logout() {
        this.set_token('', '')
    }
    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        const username = cookies.get('username')
        this.setState({
            'token': token,
            'username': username
        }, () => this.load_data())
    }
    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            'username': username,
            'password': password
        })
            .then(response => {
                this.set_token(response.data['token'], username)
            }).catch(error => alert('Неверный логин или пароль'))

    }


    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Notes</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/users'>Users</Link>
                            </li>
                            <li>
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout, {this.state.username}</button> :
                                    <Link to='/login'>Login</Link>}

                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/notes' component={() => <NotesList notes={this.state.notes} />}></Route>
                        <Route exact path='/projects' component={() => <PrjList projects={this.state.projects} />}></Route>
                        <Route exact path='/users' component={() => <UserList users={this.state.users} />}></Route>
                        <Route path="/project/:id" component={() => <Project projects={this.state.projects} />}></Route>
                        <Route path="/user/:id" component={() => <User users={this.state.users} />}></Route>
                        <Route path="/note/:id" component={() => <Note notes={this.state.notes} />}></Route>
                        <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
                        <Redirect from='/' to='/notes' />
                        <Route component={NotFound404} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div >
        )
    }
}

export default App;
