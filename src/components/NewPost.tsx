import Input from './Input';
import SubmitButton from './SubmitButton';

export default function NewPost() {
  return (
    <form
      hx-post="/api/posts"
      hx-target="#posts-list"
      hx-swap="beforeend"
      hx-ext="json-enc"
      class="min-w-72 mx-6"
    >
      <Input
        type="text"
        label="Title"
        name="title"
        placeholder="Post title..."
        required
      />

      <Input
        type="textarea"
        label="Content"
        name="content"
        placeholder="Write something..."
        required
      />

      <SubmitButton />
    </form>
  );
}
