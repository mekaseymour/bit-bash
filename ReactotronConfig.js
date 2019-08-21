import Reactotron from 'reactotron-react-native';

Reactotron.configure({
  name: 'Number Mash',
  host: '192.168.0.3',
})
  .useReactNative({
    asyncStorage: true,
  })
  .connect();
