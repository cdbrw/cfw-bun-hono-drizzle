import Nav from '../components/Nav';

type MainLayoutProps = {
  children: JSX.Element;
  isLoggedIn: boolean;
};

export default function MainLayout({ children, isLoggedIn }: MainLayoutProps) {
  return (
    <html>
      <head>
        <script
          src="https://unpkg.com/htmx.org@1.9.10"
          integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC"
          crossorigin="anonymous"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Subscribe to CodeBrew!</title>
      </head>
      <body class="w-[75%] m-auto justify-center bg-gray-800 dark:text-white">
        <header>
          <Nav isLoggedIn={isLoggedIn} />
        </header>
        <content>{children}</content>
      </body>
    </html>
  );
}
