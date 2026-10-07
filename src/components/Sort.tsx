import { View, Button } from "react-native";

type SortProps = {
    sortByName: boolean;
    sortByPriceUp: boolean;
    sortByPriceDown: boolean;
    setSortByName: (value: boolean) => void;
    setSortByPriceUp: (value: boolean) => void;
    setSortByPriceDown: (value: boolean) => void;
}

export const Sort = (props: SortProps) => {
    const HandleSortByName = () => {
        if (props.sortByName) {
            props.setSortByName(false);
        }
        else {
            props.setSortByName(true);
            props.setSortByPriceUp(false);
            props.setSortByPriceDown(false);
        }
    }
    const HandleSortByPriceUp = () => {
        if (props.sortByPriceUp) {
            props.setSortByPriceUp(false);
        }
        else {
            props.setSortByPriceUp(true);
            props.setSortByName(false);
            props.setSortByPriceDown(false);
        }
    }
    const HandleSortByPriceDown = () => {
        if (props.sortByPriceDown) {
            props.setSortByPriceDown(false);
        }
        else {
            props.setSortByPriceDown(true);
            props.setSortByName(false);
            props.setSortByPriceUp(false);
        }
    }
    return (
        <View>
            <Button title = "Sort by name" onPress={HandleSortByName}
                color={props.sortByName ? "#2E7D32" : "#E0E0E0"}/>
            <Button title = "Sort by price up" onPress={HandleSortByPriceUp}
                color={props.sortByPriceUp ? "#2E7D32" : "#E0E0E0"}/>
            <Button title = "Sort by price down" onPress={HandleSortByPriceDown}
                color={props.sortByPriceDown ? "#2E7D32" : "#E0E0E0"}/>
        </View>
    )
}