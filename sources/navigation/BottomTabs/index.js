import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tasks } from '../../Tasks';
import NavRoutes from '../NavRoutes';
import NavConfigs from '../NavConfigs';
import TabContent from './TabContent';
import { DeepLinking, GraphQL, Instagram, NativeModules } from '../../Tasks';

const Tab = createBottomTabNavigator();

const Index = () => {
  return (
    <Tab.Navigator
      screenOptions={{ ...NavConfigs.screenOptions, drawerType: 'front' }}
      drawerContent={p => <TabContent {...p} />}>
      <Tab.Screen name={NavRoutes.Tasks} component={Tasks} />
      <Tab.Screen name={NavRoutes.Tasks + '2'} component={DeepLinking} />
      <Tab.Screen name={NavRoutes.Tasks + '25'} component={GraphQL} />
      <Tab.Screen name={NavRoutes.Tasks + '254'} component={Instagram} />
      <Tab.Screen name={NavRoutes.Tasks + '2545'} component={NativeModules} />
    </Tab.Navigator>
  );
};

export default Index;
