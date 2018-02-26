const generateId = () => (100000 * Math.random()).toFixed(0)

const actionFor = {
  anecdoteCreation(content) {
    return {
      type: 'NEW',
      data: {
        content,
        votes: 0,
        id: generateId()
      }
    }
  },
  voteAnecdote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
}

export default actionFor