import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const MyComponent = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handlePress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.checkbox,
          { backgroundColor: isChecked ? 'gray' : 'white' },
          { borderColor: isChecked ? 'red' : 'black' },
        ]}
        onPress={handlePress}
      >
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>
      <Text style={styles.label}>{isChecked ? 'Checked' : 'Unchecked'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      },
      checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
      },
      checkmark: {
        fontSize: 18,
        color: 'white',
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default MyComponent;
