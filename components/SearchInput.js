import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

export default class SearchInput extends Component {
  // handleChangeText(newLocation){
  //onChangeText={this.handleChangeText.bind(this)}
  // }

  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  handleChangeText = (text) => {
    // this.props.location = newLocation;
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;
    onSubmit(text);
    this.setState({ text: "" });
  };
  render() {
    const { placeholder } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          value={text}
          autoCorrect={false}
          placeholder={placeholder}
          placeholderTextColor="white"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  textInput: { flex: 1, color: "white" },
});
