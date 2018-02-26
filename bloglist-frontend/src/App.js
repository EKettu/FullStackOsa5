import React from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      newLikes: 0,
      showAll: true,
      error: false,
      username: '',
      password: '',
      user: null,
      notification: null,
      loginVisible: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({
        blogs
      })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async (event) => {

    console.log('login kutsuttu')
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      console.log(exception)
      this.setState({
        error: true,
        notification: 'wrong username or password',
      })
      setTimeout(() => {
        this.setState({
          notification: null,
          error: false
        })
      }, 3000)
    }
  }

  logout = async () => {
    console.log('logout kutsuttu')
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      user: null
    })
  }

  addBlog = (event) => {
    event.preventDefault()
    this.BlogForm.toggleVisibility()
    const blogObject = {
      title: this.state.newTitle,
      author: this.state.newAuthor,
      url: this.state.newUrl,
      likes: this.state.newLikes
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          newTitle: '',
          newAuthor: '',
          newUrl: '',
          notification: 'a new blog \'' + blogObject.title + '\' by ' + blogObject.author + ' added'
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 3000)
      })
  }


  addLikes = (blogObject) => async () => {
    console.log('here')
    const blog = this.state.blogs.find(blog => blog.id === blogObject.id)
    console.log('blog is ', blog)
    const id = blog.id
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('changedBlog is ', changedBlog)
    await blogService.update(id, changedBlog)
    const blogs = this.state.blogs.filter(blog => blog.id !== id)
    this.setState({
      blogs: blogs.concat(changedBlog)
    })
  }

  deleteBlog = (id, blogObject) => async () => {
    if (blogObject.user === null || blogObject.user.username === this.state.user.username) {
      if (window.confirm('Delete ' + blogObject.title + 'by' + blogObject.author + '?')) {
        await blogService
          .deleteBlog(id)
        this.setState({
          blogs: this.state.blogs.filter(blog => blog.id !== id),
          notification: 'Deleted ' + blogObject.title
        })
        setTimeout(() => {
          this.setState({ notification: null })
        }, 3000)

      }
    }
    else {
      alert('You do not have permission to delete this blog')
    }
  }


  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleTitleChange = (event) => {
    console.log(event.target.value)
    this.setState({ newTitle: event.target.value })
  }

  handleAuthorChange = (event) => {
    console.log(event.target.value)
    this.setState({ newAuthor: event.target.value })
  }

  handleUrlChange = (event) => {
    console.log(event.target.value)
    this.setState({ newUrl: event.target.value })
  }

  render() {
    const blogsToRender = this.state.blogs.sort(function (blog1, blog2) { return (blog1.likes < blog2.likes) ? 1 : ((blog2.likes < blog1.likes) ? -1 : 0) })

    const userInfo = () => {
      if (!this.state.user) {
        return (<Togglable buttonLabel="login">
          <LoginForm
            visible={this.state.visible}
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleLoginFieldChange}
            handleSubmit={this.login}
          />
        </Togglable>)
      }
      return (
        <div>
          <h2>blogs</h2>
          {this.state.user.name} logged in
          <form onSubmit={this.logout}>
            <button type="submit">logout</button>
          </form>
        </div>
      )
    }
    const listBlogs = () => (
      <div>
        {blogsToRender.map(blog =>
          <Blog key={blog.id} blog={blog} user={this.state.user} addLikes={this.addLikes(blog)} deleteBlog={this.deleteBlog(blog.id, blog)} />       

        )}
        <Togglable buttonLabel="new blog" ref={component => this.BlogForm = component}>
          <BlogForm addBlog={this.addBlog}
            newTitle={this.state.newTitle} newAuthor={this.state.newAuthor} newUrl={this.state.newUrl}
            handleTitleChange={this.handleTitleChange} handleAuthorChange={this.handleAuthorChange}
            handleUrlChange={this.handleUrlChange}
          />
        </Togglable>
      </div>
    )

    return (
      <div>
        <Notification message={this.state.notification} error={this.state.error} />
        {userInfo()}
        {!this.state.user ? null : listBlogs()}
      </div>
    );
  }
}

export default App;
