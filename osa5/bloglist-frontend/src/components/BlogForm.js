import React, {useState} from 'react'

const BlogForm = ({createBlog}) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={newTitle}
            name="title"
            onChange={({target}) => setNewTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            id='author'
            type="text"
            value={newAuthor}
            name="author"
            onChange={({target}) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={newUrl}
            name="url"
            onChange={({target}) => setNewUrl(target.value)}
          />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm