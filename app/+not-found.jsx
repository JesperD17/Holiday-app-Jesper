import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <View type="title">This screen does not exist.</View>
        <Link href="/">
          <View type="link">Go to home screen!</View>
        </Link>
      </View>
    </View>
  );
}
