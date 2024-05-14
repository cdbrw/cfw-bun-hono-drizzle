export default function LogOutButton() {
  return (
    <form method="POST" action="/api/auth/logout">
      <button class="hover:underline">Log Out</button>
    </form>
  );
}
