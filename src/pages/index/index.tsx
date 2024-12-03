import { Button, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";

export default function Index() {
  return (
    <View className="index">
      <Text>Hello world!</Text>
      <button
        onClick={() => {
          Taro.navigateTo({ url: "/pages/test/index" });
        }}
      >
        test
      </button>
      <Button
        onClick={() => {
          Taro.navigateTo({ url: "/pages/user/index" });
        }}
      >
        user
      </Button>
    </View>
  );
}
