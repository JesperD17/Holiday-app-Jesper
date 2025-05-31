import { Platform } from 'react-native';

export default function HomeScreen() {
  return (
    <div
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
        />
      }>
      <div >
      </div>
      <div>
        <div>
          Edit <div type="defaultSemiBold">app/(tabs)/index.tsx</div> to see changes.
          Press{' '}
          <div type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </div>{' '}
          to open developer tools.
        </div>
      </div>
      <div>
        <div type="subtitle">Step 2: Explore</div>
        <div>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </div>
      </div>
      <div>
        <div type="subtitle">Step 3: Get a fresh start</div>
        <div>
          {`When you're ready, run `}
          <div type="defaultSemiBold">npm run reset-project</div> to get a fresh{' '}
          <div type="defaultSemiBold">app</div> directory. This will move the current{' '}
          <div type="defaultSemiBold">app</div> to{' '}
          <div type="defaultSemiBold">app-example</div>.
        </div>
      </div>
    </div>
  );
}   
