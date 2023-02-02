import React from 'react';
import './App.css';
import UserList from './components/users.js'
import PrjList from './components/projects.js'
import NotesList from './components/notes.js'
import Footer from './components/footer.js'
import Project from './components/project.js'
import User from './components/user.js'
import Note from './components/note.js'
import axios from 'axios'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'


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
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/notes')
            .then(response => {
                const notes = response.data.results
                this.setState(
                    {
                        'notes': notes
                    }
                )
            }).catch(error => console.log(error))
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
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/notes' component={() => <NotesList notes={this.state.notes} />}></Route>
                        <Route exact path='/projects' component={() => <PrjList projects={this.state.projects} />}></Route>
                        <Route exact path='/users' component={() => <UserList users={this.state.users} />}></Route>
                        <Route path="/project/:id" component={() => <Project projects={this.state.projects} />}></Route>
                        <Route path="/user/:id" component={() => <User users={this.state.users} />}></Route>
                        <Route path="/note/:id" component={() => <Note notes={this.state.notes} />}></Route>
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
