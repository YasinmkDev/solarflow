import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { FileText, LayoutDashboard, Users, Wallet, Wrench } from 'lucide-react-native';

import { theme } from '../../theme/theme';

const ICON_SIZE = 22;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.tabInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: theme.fontWeight.medium, marginTop: 2 },
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          height: 62,
          paddingTop: 6,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <LayoutDashboard size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="leads"
        options={{
          title: 'Leads',
          tabBarIcon: ({ color }) => <Users size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="quote"
        options={{
          title: 'Quote',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: focused ? theme.colors.accent : theme.colors.accentTint,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -6,
              }}>
              <FileText
                size={20}
                color={focused ? '#FFFFFF' : theme.colors.accentDark}
              />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: theme.fontWeight.medium,
            marginTop: 2,
            color: theme.colors.accentDark,
          },
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => <Wrench size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color }) => <Wallet size={ICON_SIZE} color={color} />,
        }}
      />
    </Tabs>
  );
}
