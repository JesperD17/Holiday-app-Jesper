import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <div>
        <div type="title">This screen does not exist.</div>
        <Link href="/">
          <div type="link">Go to home screen!</div>
        </Link>
      </div>
    </>
  );
}
