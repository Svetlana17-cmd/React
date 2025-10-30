
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls onSubmit with correct data', async () => {
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()
  await user.type(screen.getByPlaceholderText('title'), 'Testing React')
  await user.type(screen.getByPlaceholderText('author'), 'Dan')
  await user.type(screen.getByPlaceholderText('url'), 'https://react.dev')
  await user.click(screen.getByText('create'))

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing React',
    author: 'Dan',
    url: 'https://react.dev',
  })
})
