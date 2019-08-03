import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import MapView, { Marker, ProviderPropType } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 12.918711;
const LONGITUDE = 77.594417;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 1;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

class DefaultMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },

      markers: [
        {
          coordinate: {
            latitude: 12.926992847974502,
            longitude: 77.60068450123072
          },
          color: randomColor(),
          cost: `$1000`
        },
        {
          coordinate: {
            latitude: 12.934296902138318,
            longitude: 77.59282696992159
          },
          color: randomColor(),
          cost: `$1000`
        },
        {
          coordinate: {
            latitude: 12.9017148975373,
            longitude: 77.58819412440062
          },
          color: randomColor(),
          cost: `$1000`
        },
        {
          coordinate: {
            latitude: 12.91530598217467,
            longitude: 77.60627087205648
          },
          color: randomColor(),
          cost: `$1000`
        },
        {
          coordinate: {
            latitude: 13.090755,
            longitude: 77.289886
          },
          color: randomColor(),
          cost: `$1000`
        },
        {
          coordinate: {
            latitude: 12.909551070917862,
            longitude: 77.59328126907349
          },
          color: randomColor(),
          cost: `$1000`
        },
        {
          coordinate: {
            latitude: 12.928586543379579,
            longitude: 77.58169915527105
          },
          color: randomColor(),
          cost: `$1000`
        }
      ]
    };
  }

  onMapPress(e) {
    console.log(e.nativeEvent.coordinate);
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
          color: randomColor()
        }
      ]
    });
  }
  onClear = () => {};

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={this.state.region}
          onPress={e => this.onMapPress(e)}
          showsUserLocation={true}
        >
          {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
              pinColor={marker.color}
            >
              <View style={styles.marker}>
                <Text style={styles.text}>{marker.cost}</Text>
              </View>
            </Marker>
          ))}
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ markers: [] })}
            style={styles.bubble}
          >
            <Text>Tap to create a marker of random color</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

DefaultMarkers.propTypes = {
  provider: ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  marker: {
    backgroundColor: "#550bbc",
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: "#FFF",
    fontWeight: "bold"
  }
});

export default DefaultMarkers;
