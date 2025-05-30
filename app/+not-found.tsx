import { Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
        <div>This screen does not exist.</div>
        {/* <div href="/">
          <div>Go to home screen!</div>
        </div> */}
    </>
  );
};