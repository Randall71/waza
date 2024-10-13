import { Image } from "expo-image";
import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { Button } from "../ui/button";

const data = [...new Array(2).keys()];
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function OnBoardingScreen() {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View className="flex-1">
      <View className="h-[60%] items-center justify-center bg-gray-100">
        <Carousel
          ref={ref}
          width={width}
          height={height * 0.6}
          data={data}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <View className="flex-1 items-center justify-center">
              <Image
                style={{ width: width, height: height * 0.55 }}
                source={
                  index === 0
                    ? require("~/assets/images/onboarding_picture.svg")
                    : require("~/assets/images/onboarding_picture_one.svg")
                }
                contentFit="cover"
              />
            </View>
          )}
        />
      </View>

      <View className="h-[40%] items-center justify-start pt-10 px-4">
        <Text className="text-xl font-semibold mb-4">Lorem Ipsum</Text>
        <Text className="text-center mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop: 10 }}
          onPress={onPressPagination}
        />

        <Button className="w-full mt-6">
          <Text className="text-white">Créer un compte</Text>
        </Button>
      </View>
    </View>
  );
}
