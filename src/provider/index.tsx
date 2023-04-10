import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TamaguiProvider } from 'tamagui';

import config from '~/tamagui.config';

export const Provider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        retry: 3,
        networkMode: 'offlineFirst',
      },
    },
  });

  return (
    <TamaguiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Suspense>
          <GestureHandlerRootView style={StyleSheet.flatten({ flex: 1 })}>
            <NavigationContainer>{children}</NavigationContainer>
          </GestureHandlerRootView>
        </Suspense>
      </QueryClientProvider>
    </TamaguiProvider>
  );
};
