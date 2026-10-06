import { create } from "zustand";
type TypeAction = (num: number) => void
type CounterStore = {
    counter: number,
    up:TypeAction,
    down: TypeAction,
    nullify: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
    counter: 0,
    up: (num) => {
        set((state) => ({
            counter: state.counter + num > 0 ? state.counter + num : 0
        }));
    },
    down: (num) => {
        set((state) => ({
            counter: state.counter - num > 0 ? state.counter - num : 0
        }));
    },
    nullify: () => {
        set(() => ({
            counter: 0
        }));
    }

}))