import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Input} from 'react-native-elements';

const Form = () => {
    return (
        <View style={styles.baseContainer}>
            <Text>Form Component</Text>
            <Input
                placeholder="Title"
            />
            <Input
                placeholder="Artist"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    baseContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Form;
