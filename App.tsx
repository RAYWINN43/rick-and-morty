import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RickListScreen from './src/screen/RickListScreen';
import RickDetailScreen from './src/screen/RickDetailScreen';
import { RootStackParamList } from './src/types/navigation';


const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
return (
<NavigationContainer>
<Stack.Navigator initialRouteName="RickList">
<Stack.Screen
name="RickList"
component={
  RickListScreen
}
options={{ title: 'Mes personnages' }}
/>
{
   <Stack.Screen
     name="RickDetail"
     component={RickDetailScreen}
     options={{ title: 'Détail du personnage' }}
   />
}
</Stack.Navigator>
</NavigationContainer>
);
}