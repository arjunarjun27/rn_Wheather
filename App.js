import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import getImageForWeather from "./utils/getImageForWeather";
import SearchInput from "./components/SearchInput";
import { fetchLocationId, fetchWeather } from "./utils/api";

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: false,
  //     error: false,
  //     location: "",
  //     temparature: 0,
  //     weather: "",
  //   };
  // }

  state = {
    loading: false,
    error: false,
    location: "",
    temparature: 0,
    weather: "",
  };

  componentDidMount() {
    ///this.handleUpdateLocation("Chennai");
    //this.setState({ weather: "Clear" }, () => console.log(this.state));
  }

  // handleUpdateLocation = (city) => {
  //   this.setState({ location: city });
  // };

  handleUpdateLocation = async (city) => {
    if (!city) return;
    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({ loading: false, error: true });
      }
    });
  };
  render() {
    //const style = { color: "red" };
    //const { location } = this.state;
    const { loading, error, location, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {error && (
              <Text style={[styles.smallText, styles.textStyle]}>
                Could not load weather, please try a different city
              </Text>
            )}
            {!error && (
              <View>
                <Text style={[styles.largeText, styles.textStyle]}>
                  {location}
                </Text>
                <Text style={[styles.smallText, styles.textStyle]}>
                  {weather}
                </Text>

                {location.length < 0 && (
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                )}
              </View>
            )}
            <SearchInput onSubmit={this.handleUpdateLocation} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },

  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
});
