import React, {useEffect} from 'react';
import TrackPlayer from 'react-native-track-player';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {Icon, Image} from 'react-native-elements';


const Player = ({navigation, tracksObject, route}) => {
    const [played, setPlayed] = React.useState(false);
    const [trackObject, setTrackObject] = React.useState(tracksObject);
    const playTrack = async () => {
        await TrackPlayer.play();
    };
    useEffect(() => {
        setTrackObject(tracksObject);
    }, [tracksObject]);
    useEffect(async () => {
        route?.params?.id && await TrackPlayer.skip(route.params.id);
        let trackIndex = route?.params?.id && await TrackPlayer.getCurrentTrack();
        let trackObject = route?.params?.id && await TrackPlayer.getTrack(trackIndex);
        route?.params?.id && setTrackObject(trackObject);
        route?.params?.id && setPlayed(true);
        route?.params?.id && await playTrack();
    }, [route?.params?.id]);
    const nextTrack = async () => {
        await TrackPlayer.skipToNext();
        let trackIndex = await TrackPlayer.getCurrentTrack();
        let trackObject = await TrackPlayer.getTrack(trackIndex);
        setTrackObject(trackObject);
    };
    const prevTrack = async () => {
        await TrackPlayer.skipToPrevious();
        let trackIndex = await TrackPlayer.getCurrentTrack();
        let trackObject = await TrackPlayer.getTrack(trackIndex);
        setTrackObject(trackObject);
    };
    return (
        <SafeAreaProvider style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row'}}>
                <View style={{
                    backgroundColor: '#fff',
                    width: 60,
                    marginTop: 30,
                    alignItems: 'center',
                }}>
                    <Icon
                        name="form"
                        type="ant-design"
                        color="#000"
                        size={20}
                        onPress={() => navigation.navigate('Form')
                        }/>
                </View>
                <View style={{
                    backgroundColor: '#fff',
                    width: 60,
                    marginTop: 30,
                    left: 293,
                    alignSelf: 'flex-start',
                    alignItems: 'center',
                }}>
                    <Icon
                        name="play-list"
                        type="fontisto"
                        color="#000"
                        size={20}
                        onPress={() => navigation.navigate('RemoteTracks')
                        }/>
                </View>
            </View>
            <SafeAreaView style={styles.sectionContainer}>
                <Image
                    source={{uri: trackObject.artwork}}
                    style={{width: 300, height: 300}}
                />
                <Text style={styles.title}>{trackObject.title}</Text>
                <Text>{trackObject.artist}</Text>
                <View style={{flexDirection: 'row', marginTop: 30}}>
                    <Icon
                        raised
                        name="step-backward"
                        type="font-awesome"
                        color="#000"
                        size={20}
                        onPress={async () => {
                            await prevTrack();
                        }}/>
                    {!played ? <Icon
                        raised
                        name="play"
                        type="font-awesome"
                        color="#000"
                        size={30}
                        onPress={async () => {
                            setPlayed(true);
                            await playTrack();
                        }
                        }/> : <Icon
                        raised
                        name="pause"
                        type="font-awesome"
                        color="#000"
                        size={30}
                        onPress={async () => {
                            setPlayed(false);
                            await TrackPlayer.pause();
                        }
                        }/>}
                    <Icon
                        raised
                        name="step-forward"
                        type="font-awesome"
                        color="#000"
                        size={20}
                        onPress={async () => {
                            await nextTrack();
                        }}/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Player;
