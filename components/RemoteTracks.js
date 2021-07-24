import React from 'react';
import {View} from 'react-native';
import {Avatar, Header, ListItem} from 'react-native-elements';


const RemoteTracks = ({navigation, tracks}) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
        }}>
            <Header
                placement="center"
                leftComponent={{icon: 'arrow-back', size: 27, color: '#fff', onPress: () => navigation.goBack()}}
                centerComponent={{text: 'Tracks', style: {color: '#fff', fontSize: 17, marginTop: 2}}}
            />
            <View style={{width: '100%'}}>
                {
                    tracks.map((l, i) => (
                        <ListItem onPress={() => {
                            navigation.navigate('Player', {id: l.id.toString()});
                        }} key={i} bottomDivider>
                            <Avatar source={{uri: l.artwork}}/>
                            <ListItem.Content>
                                <ListItem.Title>{l.title}</ListItem.Title>
                                <ListItem.Subtitle>{l.artist}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
            </View>
        </View>
    );
};

export default RemoteTracks;
