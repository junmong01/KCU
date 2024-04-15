import React from 'react';
import { Platform, Button } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const FilePicker = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file.name);
  };

  if (Platform.OS === 'web') {
    return (
      <input type="file" onChange={handleFileChange} />
    );
  } else {
    const selectFile = async () => {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.pdf],
        });
        console.log('Selected file:', res);
      } catch (err) {
        console.error('Error picking document:', err);
      }
    };

    return (
      <Button title="Select File" onPress={selectFile} />
    );
  }
};

export default FilePicker;