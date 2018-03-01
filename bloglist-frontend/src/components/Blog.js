import React from 'react'

class Blog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleSelection = (event) => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    let correctUser = false

    if (this.props.blog.user === undefined) {
      correctUser = true
    }
    let showUser = ''
    if (this.props.blog.user !== undefined) {
      showUser = this.props.blog.user.name
      if(this.props.blog.user.username === this.props.user.username) {
        correctUser=true
      }
    }

    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const showIfUser = { display: this.props.blog.user ? '' : 'none' }
    const showIfCorrectUser = { display: correctUser ? '' : 'none' }

    return (
      <div>
        <div onClick={this.handleSelection} style={blogStyle} className="name">
          <a href='#' >{this.props.blog.title}</a> {this.props.blog.author}
        </div>
        <div style={showWhenVisible} className="details">
          {this.props.blog.title}
          <p>{this.props.blog.url}</p>
          <p>{this.props.blog.likes} likes <button onClick={this.props.addLikes} >like</button></p>
          <div style={showIfUser}>
            added by {showUser}
          </div>
          <div style={showIfCorrectUser}>
            <button onClick={this.props.deleteBlog} >Delete</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Blog