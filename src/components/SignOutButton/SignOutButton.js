import { Text, Image, TouchableOpacity, View, Pressable, ImageBackground, ImageBackgroundComponent } from "react-native";
import { Auth, Amplify } from "aws-amplify";

const SignOutButton = () => {
    const signOut = async () => {
        try {
            await Auth.signOut();
        } catch (error) {
            console.log("Error signing out: ", error);
        }
    }

    return (
        <Pressable style={{
            backgroundColor: '#2e8cff',
            width: 80,
            height: 50,
            justifyContent: 'center',
        }}
        onPress ={() => signOut()}>
                <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 15, color: 'white'}}>Sign Out</Text>
        </Pressable>
    )
}

export default SignOutButton;