import React from 'react'

class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            text: '',
            project: '',
            owner: '',
            deadLine: '',
        }
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }
    handleSubmit(event) {
        this.props.createNote(this.state.title, this.state.text, this.state.project, this.state.owner, this.state.deadLine)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label for="title">Название</label>
                    <input type="text" className="form-control" name="title"
                        value={this.state.title} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="text">Текст</label>
                    <input type="text" className="form-control" name="text"
                        value={this.state.text} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="project">Проект</label>
                    <input type="text" className="form-control" name="project"
                        value={this.state.project} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="owner">Владелец</label>
                    <input type="text" className="form-control" name="owner"
                        value={this.state.owner} onChange={(event) => this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label for="deadLine">Дэдлайн</label>
                    <input type="text" className="form-control" name="deadLine"
                        value={this.state.deadLine} onChange={(event) => this.handleChange(event)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Save" />
            </form>
        );
    }
}
export default NoteForm
