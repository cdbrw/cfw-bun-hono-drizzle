import Button from './Button';
import Input from './Input';

type AuthFormProps = {
  description: string;
  action: 'Log in' | 'Sign up';
};

export function AuthForm({ description, action }: AuthFormProps) {
  const targetUrl = `/api/auth/${action === 'Log in' ? 'login' : 'signup'}`;

  return (
    <form class="w-full max-w-sm pt-8" method="POST" action={targetUrl}>
      <div class="mb-8">
        <h1 className="text-2xl">{action}</h1>
        <p>{description}</p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Input
            name="email"
            placeholder="Email"
            label="email"
            type="text"
            hasBottomMargin
            required
          />
        </div>
        <div className="grid gap-2">
          <Input
            name="password"
            placeholder="Password"
            label="password"
            type="password"
            hasBottomMargin
            required
          />
        </div>
      </div>
      <div>
        <Button type="submit" text={action} />
      </div>
    </form>
  );
}
