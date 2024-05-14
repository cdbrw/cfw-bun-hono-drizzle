import Input from './Input';
import Button from './Button';

export default function NewPost() {
  return (
    <div>
      <h1 class="text-2xl mb-4">Create Post</h1>
      <form
        hx-post="/api/posts"
        hx-target="#posts-list"
        hx-swap="beforeend"
        class="w-72 min-w-72"
      >
        <Input
          type="text"
          label="Title"
          name="title"
          placeholder="Post title..."
          hasBottomMargin
          required
        />

        <Input
          type="textarea"
          label="Content"
          name="content"
          placeholder="Write something..."
          required
        />

        <Button type="submit" text="Create" />
      </form>
    </div>
  );
}
