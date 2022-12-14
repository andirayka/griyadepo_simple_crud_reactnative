import DocumentPicker from 'react-native-document-picker';

// Pick a single files
export const getSingleDocument = async () => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],
      presentationStyle: 'fullScreen',
    });

    return res;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
    } else {
      throw err;
    }
  }
};
