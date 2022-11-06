import {SnackbarKind} from './UiHooksInterfaces';
import React, {useState} from 'react';
import {Snackbar} from 'react-native-paper';
import {SnackbarStyles} from './UiHooksStyles';
import {Text, View} from 'react-native';
import { theme } from '../../theme/Theme';

export const useSnackbar = (init: SnackbarKind) => {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [snackbarKind, setSnackbarKind] = useState<SnackbarKind>(init);

  function update(kind: SnackbarKind) {
    setSnackbarKind(kind);
  }

  const handleSnackbarClosing = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };
  if (!isOpen) {
    return [
      <></>,
      {
        open,
        close,
        update,
      },
    ] as const;
  }
  const snackbar = (
    <Snackbar
      visible={isOpen}
      theme={{colors: {inversePrimary: 'white' }}}
      style={
        snackbarKind.severity === 'success'
          ? SnackbarStyles.successSnackbar
          : SnackbarStyles.errorSnackbar
      }
      duration={6000}
      onDismiss={handleSnackbarClosing}
      action={{
        label: 'Close',
        onPress: () => {
          handleSnackbarClosing();
        },
      }}>
      <Text style={{color:'white'}}>{snackbarKind.messageTranslationKey}</Text>
    </Snackbar>
  );
  return [
    snackbar,
    {
      open,
      close,
      update,
    },
  ] as const;
};
export const useTextInput = (
  value: string,
  standBy: {onStandBy: () => void; args: {}; time: number},
  errorsSet: Set<string>,
  onChange: (event: any) => void,
) => {};
