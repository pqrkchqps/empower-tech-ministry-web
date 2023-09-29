import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Threads from './Threads';
import ThreadDetails from './ThreadDetails';

const Stack = createNativeStackNavigator();

const ThreadNavigator = () => {
    return (
      <Stack.Navigator >    
         <Stack.Screen
          name="Threads"
          component={Threads}
        />
         <Stack.Screen
          name="ThreadDetails"
          component={ThreadDetails}
        />
      </Stack.Navigator>
    );
  }

  export default ThreadNavigator;