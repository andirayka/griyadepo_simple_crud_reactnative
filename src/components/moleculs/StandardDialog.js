import React from 'react';
import {Button, Dialog, Paragraph, Portal} from 'react-native-paper';
export const StandardDialog = ({
  visible,
  onDismiss,
  title,
  description,
  action1Text,
  action2Text,
  onPressAction1,
  onPressAction2,
}) => {
  return (
    <Portal>
      <Dialog dismissable={!!onDismiss} visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{description}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onPressAction1}>{action1Text}</Button>

          {action2Text && (
            <Button onPress={onPressAction2}>{action2Text}</Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
