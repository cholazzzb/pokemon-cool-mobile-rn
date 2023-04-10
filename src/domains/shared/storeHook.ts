/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * // TODO:
 * Finish implement save pokemon data to local storage to reduce loading time,
 * because pokemon data is rarely changes.
 * But We still need to check to BE at some time to prevent outdated data.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

type Memory = {
  data: any;
  lastUpdate: string;
};

export const createMemory = (data: any, timeStamp: string): string => {
  const memory: Memory = {
    data,
    lastUpdate: timeStamp,
  };
  return JSON.stringify(memory);
};

export const checkMemoryNeedUpdate = (value: string, newUpdateTime: Date) => {
  const data = JSON.parse(value);
  if (!data.lastUpdate) return true;
  return data.lastUpdate !== newUpdateTime;
};

type SyncStoreParams<S extends (...args: any) => Promise<any>> = {
  storeKey: string;
  service: S;
  savedDataFromService: (data: Awaited<ReturnType<S>>) => any;
  onSuccess: (data: Awaited<ReturnType<S>>) => void;
  onFetching: () => void;
  onError: () => void;
};
const syncStore = async <S extends (...args: any) => Promise<any>>({
  storeKey,
  service,
  savedDataFromService,
  onSuccess,
  onFetching,
  onError,
}: SyncStoreParams<S>): Promise<void> => {
  try {
    onFetching();
    const promises: [Promise<string | null>, ReturnType<S>] = [
      AsyncStorage.getItem(storeKey).then((value) => {
        if (value !== null) {
          const data = JSON.parse(value);
          onSuccess(data);
        }
        return value;
      }),
      service() as ReturnType<S>,
    ];

    const [value, data] = await Promise.all(promises);
    if (value === null) {
      const newMemory = createMemory(
        savedDataFromService(data),
        data.data.lastUpdate,
      );
      AsyncStorage.setItem(storeKey, newMemory);
      onSuccess(data);
      return;
    }
    const needUpdate = checkMemoryNeedUpdate(
      value,
      new Date(data.data.lastUpdate),
    );
    if (needUpdate) {
      const newMemory = createMemory(
        savedDataFromService(data),
        data.data.lastUpdate,
      );
      AsyncStorage.setItem(storeKey, newMemory);
    }
    onSuccess(data);
  } catch (error) {
    onError();
  }
};

type Status = 'Idle' | 'Fetching' | 'Success' | 'Error';
type UseStoreParam<S extends (...args: any) => Promise<any>> = {
  storeKey: string;
  service: S;
  savedDataFromService: (data: Awaited<ReturnType<S>>) => any;
  onSuccess?: (data: Awaited<ReturnType<S>>) => void;
  onFetching?: () => void;
  onError?: () => void;
};

export const useStore = <S extends (...args: any) => Promise<any>>({
  storeKey,
  service,
  savedDataFromService,
  ...cb
}: UseStoreParam<S>) => {
  const [state, setState] = useState<{
    status: Status;
    data?: Awaited<ReturnType<S>>;
  }>({
    status: 'Idle',
    data: undefined,
  });

  useEffect(() => {
    syncStore({
      storeKey,
      service,
      savedDataFromService,
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          data,
          status: 'Success',
        }));
        cb.onSuccess && cb.onSuccess(data);
      },
      onFetching: () => {
        setState((prev) => ({ ...prev, status: 'Fetching' }));
        cb.onFetching && cb.onFetching();
      },
      onError: () => {
        setState((prev) => ({ ...prev, status: 'Error' }));
        cb.onError && cb.onError();
      },
    });
  }, []);

  return state;
};
