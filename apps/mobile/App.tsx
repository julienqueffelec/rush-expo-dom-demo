import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import TipTapWrap from "./TipTapWrap";

const App = (): JSX.Element => {
  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        flex: 1,
        margin: 100,
      }}
    >
      <View style={{ flex: 1, padding: 20 }}>
        <Text>Before TipTapWrap</Text>
        <TipTapWrap />
        <Text>After TipTapWrap</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
