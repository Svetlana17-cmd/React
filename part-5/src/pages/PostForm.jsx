const PostForm = ({onSubmit, handleChange, value}) => {
  return (
    <div>
      <h2>Create a new post</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input value={newPost} onChange={handleChange} />
        <button type="submit" className="bg-gray-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">save</button>
      </form>
    </div>
  )
  
}
export default PostForm