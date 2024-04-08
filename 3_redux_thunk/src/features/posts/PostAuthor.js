import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/userSlice'

const PostAuthor = ({userId}) => {
    const users = useSelector(selectAllUsers);

    const author = users.find((user) => user.id === Number(userId));

  return (
    <p>
        - {author ? author.name : 'Author not found'}
    </p>
  )
}

export default PostAuthor