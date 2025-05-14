import { TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onFocus?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress, onFocus }: Props) => {
  return (
    <View className="flex-row items-center rounded-full px-3 py-2 border mb-2">
      <TextInput
        onPress={onPress}
        onFocus={onFocus}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
