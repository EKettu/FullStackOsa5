import React from 'react';
import ReactDOM from 'react-dom'
import actionFor from './actionCreators'

class App extends React.Component {

  addAnecdote = (event) => {
    event.preventDefault()
    this.props.store.dispatch(
      actionFor.anecdoteCreation(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  voteAnecdote = (id) => () => {
    this.props.store.dispatch(
      actionFor.voteAnecdote(id)
    )
  }

  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort(function (anecdote1, anecdote2) { return (anecdote1.votes < anecdote2.votes) ? 1 : ((anecdote2.votes < anecdote1.votes) ? -1 : 0) })
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.voteAnecdote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit' >create</button>
        </form>
      </div>
    )
  }
}

export default App