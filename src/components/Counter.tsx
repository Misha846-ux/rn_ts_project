import { View, Button, Text } from "react-native"
import { useCounterStore } from "../store/useCounterStore"
const Counter = () => {
    const counter = useCounterStore((state) => state.counter)
    const upHandler = useCounterStore((state) => state.up)
    const downHandler = useCounterStore((state) => state.down)
    const nullifyHandler = useCounterStore((state) => state.nullify)
    const num = 10
    return (
        <View>
            <Button title="Up" onPress={() => upHandler(num)}></Button>
            <Text>{counter}</Text>
            <Button title="down" onPress={() => downHandler(num)}></Button>
            <Button title="nullify" onPress={nullifyHandler}/>
        </View>
    )
}

export default Counter