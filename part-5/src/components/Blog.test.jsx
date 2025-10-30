import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'React Testing',
  author: 'Dan Abramov',
  url: 'https://react.dev',
  likes: 5,
  user: { username: 'tester', name: 'Test User' },
}

const currentUser = { username: 'tester' }

describe('Blog component', () => {
  test('renders title and author, but not url or likes by default', () => {
    render(<Blog blog={blog} currentUser={currentUser} />)

    expect(screen.getByText('React Testing by Dan Abramov')).toBeDefined()
    expect(screen.queryByText('https://react.dev')).toBeNull()
    expect(screen.queryByText(/likes:/)).toBeNull()
  })

  test('shows url and likes when view button is clicked', async () => {
    render(<Blog blog={blog} currentUser={currentUser} />)

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))

    expect(screen.getByText('https://react.dev')).toBeDefined()
    expect(screen.getByText(/likes: 5/)).toBeDefined()
  })

  test('like button calls event handler twice when clicked twice', async () => {
    const mockHandler = vi.fn()

    render(
      <Blog
        blog={blog}
        currentUser={currentUser}
        handleLike={mockHandler}
      />
    )

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})
