import { Modal, Pressable, StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { findUserByUsername } from "../../../crud/UserOperations";
import { Header } from "aws-amplify-react-native";
import ProfileMini from "../../ProfileMini";
import { getFollowsList } from "../../../crud/FollowingOperations";
import { getFollowersList } from "../../../crud/FollowersOperations";

const NonCurrUserProfileModal = ({modalVisible, setModalVisible, entry, image}) => {
    const [user, setUser] = useState("");
    const [followingCount, setFollowingCount] = useState("");
    const [followersCount, setFollowersCount] = useState("");

    useEffect(() => {
        getUserObject(entry);
        getFollowingCount(entry);
        getFollowersCount(entry);
    }, []);
    
    const closeModal = () => {
        setModalVisible(false);
    };

    async function getUserObject(user) {
        const userObj = await findUserByUsername(user.username);
        setUser(userObj);
    };

    async function getFollowingCount(user) {
        const followingList = await getFollowsList(user.username);
        setFollowingCount(followingList.length);
    };

    async function getFollowersCount(user) {
        const followersList = await getFollowersList(user.username);
        setFollowersCount(followersList.length);
    }

    return (
        <Modal 
            visible={modalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={closeModal}
        >
            <View style={{
                alignItems: "left",
                justifyContent: "top"
            }}>
                </View><View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        backgroundColor: "white",
                        justifyContent: "top",
                        paddingTop: 200
                    }}>
                        <Text>click the profile pic to return for now</Text>
                        <View style = {{ paddingTop: 0, paddingBottom: 10, flexDirection: "row", alignContent: "center" }}>
                            <ProfileMini onClick= {closeModal} src={image}/>
                            <Text style={styles.username}>@{user.username}</Text>
                        </View>
                        <View style={styles.followingContainer}>
                            <Text style={styles.followingText}>Following</Text>
                            <Text style={styles.followingText}>{followingCount}</Text>
                            <View style={styles.followingContainer}>
                                <Text style={styles.followingText}>Followers</Text>
                                <Text style={styles.followingText}>{followersCount}</Text>
                            </View>
                        </View>
                        <View style={styles.bioContainer}>
                            <Text style={styles.bio}>{user.bio}</Text>
                        </View>
                    </View>
        </Modal>
    );

};
const styles = StyleSheet.create({
    centeredView: {
    margin: 0,
    height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
        position: "absolute",
        backgroundColor: "white",
        top:0,
        left:0,
        height:"100%",
        width: "100%",
  
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
    },
    backArrow: {
        width: 80,
        height: 80,
        backgroundColor: "white",
        paddingTop: 10
        
    },
    username: {
        paddingTop: 30,
        paddingBottom: 0,
        paddingLeft: 15,
        fontSize: 15,
        fontWeight: "bold"
    },
    followercount: {
        fontSize: 20,
        color: "black"
    },
    bioContainer: {
        width: 310,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: .5,
        minHeight: "auto",
        borderRadius: 10,
        flexDirection: "column"
    },
    bio: {
        paddingTop: 5,
        paddingBottom: 50,
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 15
    },
    followingContainer: {
        width: 60,
        height: 60,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        minHeight: "auto",
        flexDirection: "column",
        alignItems: "center"
    },
    followingText: {
        fontSize: 11,
        fontWeight: "bold"
    }
  });

export default NonCurrUserProfileModal;