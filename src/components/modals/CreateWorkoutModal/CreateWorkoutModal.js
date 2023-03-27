import { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity, Modal, TextInput, Button } from "react-native";
import CustomButton from "../../CustomButton";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import { blueThemeColor, grayThemeColor } from "../../../library/constants";
export default function CreateWorkoutModal({ modalVisible, setModalVisible }) {
  //const modalVisible = props.modalVisible;
  //const setModalVisible = props.setModalVisible;
  const [workoutTitle, setWorkoutTitle] = useState("");
  const [setsList, addToSetsList] = useState([]);
  const listItems = setsList.map((val) => {
    <Exercise />;
  });
  const closeModal = () => {
    setModalVisible(false);
  };

  const initialValues = {
    friends: [
      {
        name: "",
        email: "",
      },
    ],
  };
  /*const initialValues = {
    workout: {
      workoutname: "",
      exercises: [
        {
          exerciseName: "",
          sets: [
            {
              setNumber: 0,
              reps: 0,
            },
          ],
        },
      ],
    },
  };*/
  return (
    <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
      <View style={styles.centeredView}>
        <Pressable onPress={closeModal} style={styles.transparentView} />
        <View style={styles.blowupmain}>
          <View style={styles.blowupheader}></View>
          <View>
            <Formik
              initialValues={initialValues}
              onSubmit={async (values) => {
                console.log(values);
              }}
            >
              {({ values }) => (
                <Form>
                  <FieldArray name="friends">
                    {({ insert, remove, push }) => (
                      <View>
                        {values.friends.length > 0 &&
                          values.friends.map((friend, index) => (
                            <View style={{ flexDirection: "row" }} key={index}>
                              <View style={{ flexDirection: "column" }}>
                                <Text>Name</Text>
                                <Field name={`friends.${index}.name`} placeholder="Jane Doe" type="text" />
                                <ErrorMessage name={`friends.${index}.name`} component="View" className="field-error" />
                              </View>
                              <View style={{ flexDirection: "column" }}>
                                <Text>Email</Text>
                                <Field name={`friends.${index}.email`} placeholder="jane@acme.com" type="email" />
                                <ErrorMessage name={`friends.${index}.name`} component="View" className="field-error" />
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <Button title="X" onPress={() => remove(index)}></Button>
                              </View>
                            </View>
                          ))}
                        <Button title="Add friend" onPress={() => push({ name: "", email: "" })}></Button>
                      </View>
                    )}
                  </FieldArray>
                  <Button title="Invite" type="submit"></Button>
                </Form>
              )}
            </Formik>
            {/*<Formik
              initialValues={initialValues}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ values }) => (
                <Form>
                  <Field name="workout">
                    <Field onChangeText={setWorkoutTitle} placeholder={"Name your workout"} style={styles.blowupheader} />
                    <FieldArray name="exercises">
                      {({ insert, remove, push }) => (
                        <View>
                          {values.workout.exercises.map((exercise, index) => (
                            <Field name={"exercises." + index + ".exerciseName"} placeholder="enter exercise name" type="text" />
                          ))}
                        </View>
                      )}
                    </FieldArray>
                  </Field>
                </Form>
              )}
                          </Formik>*/}
            {/* setsList.map( ...) */}
            <Text style={styles.blowupbody}>- Hello</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
function Exercise() {
  const [exercise, setExercise] = useState("");
  return (
    <View style={styles.exerciseContainer}>
      <View style={styles.addExerciseNameContainer}>
        <TextInput onChangeText={setExercise} placeholder={"Name the exercise"} style={styles.exerciseName} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseContainer: {
    //flex: 1,
    minHeight: 100,
    flexDirection: "column",
    //backgroundColor: "#202124",
    borderTopWidth: 5,
    borderBottomWidth: 5,
    width: "100%",
  },
  addExerciseNameContainer: {
    // flexDirection: "row",
    height: 30,
    //marginBottom: 20,
    //borderColor: "black",
    //textAlign: "center",
    borderBottomWidth: 3,
  },
  exerciseName: {
    color: blueThemeColor,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
    //textAlign: "center",
    //borderBottomWidth: 3,
  },
  centeredView: {
    flex: 1,
    //top: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  transparentView: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    zIndex: -1,
  },
  blowupmain: {
    width: "100%",
    minHeight: 400,
    //height: 400,
    //marginTop: 20,
    //position: "absolute",
    //right: 0,
    backgroundColor: "rgba(200,212,225,0.7)",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 2,
    borderTopWidth: 3,
    borderRightColor: "black",
  },
  blowupheader: {
    height: 53,
    marginBottom: 20,
    borderColor: "black",
    color: blueThemeColor,
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 2,
    textAlign: "center",
    borderBottomWidth: 3,
  },
  blowupbody: {
    fontSize: 21,
    textAlign: "left",
    paddingLeft: 20,
    marginTop: 5,
  },
});
