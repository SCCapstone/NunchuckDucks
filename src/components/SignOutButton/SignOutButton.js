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
            backgroundColor: 'white'
        }}
        onPress ={() => signOut()}>
                <Text style={{textDecorationLine: 'underline', color: 'blue'}}>Sign Out</Text>
        </Pressable>
    )
}

export default SignOutButton;