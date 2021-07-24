import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import Player from './components/Player';
import {createStackNavigator} from '@react-navigation/stack';
import RemoteTracks from './components/RemoteTracks';
import axios from 'react-native-axios';
import TrackPlayer from 'react-native-track-player';
import Form from './components/Form';

const App = () => {
    const Stack = createStackNavigator();
    const API_URL = 'http://10.0.2.2:5000';
    const [tracks, setTracks] = useState([]);
    const [trackObject, setTrackObject] = React.useState({});
    React.useEffect(async () => {
        axios.get(API_URL).then(r => {
            TrackPlayer.setupPlayer().then(async () => {
                await TrackPlayer.add(r.data);
                setTracks(r.data);
            });
        });
        let trackIndex = await TrackPlayer.getCurrentTrack();
        let trackObject = await TrackPlayer.getTrack(trackIndex);
        setTrackObject(trackObject);
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
                mode="card">
                <Stack.Screen name="Player">
                    {props => <Player {...props} tracksObject={trackObject}/>}
                </Stack.Screen>
                <Stack.Screen name="RemoteTracks">
                    {props => <RemoteTracks {...props} tracks={tracks}/>}
                </Stack.Screen>
                <Stack.Screen name="Form">
                    {props => <Form {...props}/>}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default App;
