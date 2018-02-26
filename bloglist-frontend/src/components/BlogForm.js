import React from 'react'

const BlogForm = ({addBlog, newTitle, newAuthor, newUrl,
    handleTitleChange, handleAuthorChange, handleUrlChange}) => (
        <div>
            <h2>Create a new blog</h2>

            <form onSubmit={addBlog}>
                <div>
                    Title: <input value={newTitle}
                        onChange={handleTitleChange} />
                </div>
                <div>
                    Author: <input value={newAuthor}
                        onChange={handleAuthorChange} />
                </div>
                <div>
                    Url: <input value={newUrl}
                        onChange={handleUrlChange} />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )

export default BlogForm