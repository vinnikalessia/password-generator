// import
import { View, TextInput} from 'react-native'
import Slider from '@react-native-community/slider';

// styles
import styles from '../styles/generate'

// colors
import colors from '../styles/colors';

export default ({sliderValue, handleSliderChange, textInputValue, handleTextInputChange, handleTextInputSubmit}: {sliderValue: number, handleSliderChange: any, textInputValue: any, handleTextInputChange: any, handleTextInputSubmit: any}) => {

    return (
        <>
            <Slider
                style={styles.slider}
                minimumValue={4}
                maximumValue={50}
                step={1}
                value={sliderValue}
                onValueChange={handleSliderChange}
                minimumTrackTintColor={colors.neutral[100]}
                maximumTrackTintColor={colors.neutral[100]}
                thumbTintColor={colors.neutral[100]}
                tapToSeek={true}
            />
            <View style={styles.sliderText}>
                <TextInput
                keyboardType="numeric"
                value={textInputValue}
                onChangeText={handleTextInputChange}
                onSubmitEditing={handleTextInputSubmit}
                />
            </View>
        </>
    )
}