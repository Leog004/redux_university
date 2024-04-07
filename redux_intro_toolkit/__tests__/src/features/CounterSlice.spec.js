import counterSlice, {increment, decrement, reset, incrementByAmount} from "../../../src/features/counter/counterSlice";
describe('counter slice', () => {
    
    let initialState = {};

    beforeEach(() => {
        initialState = {
            count: 0
        };
    });

    it('should increment the initial state by 1 when increment action is called', () => {
        let value = 0;

        value = counterSlice(initialState, increment);
        value = counterSlice(value, increment);
        value = counterSlice(value, increment);
        const nextState = counterSlice(value, increment);
        expect(nextState.count).toBe(4);
    });

    it('should decrement the inital state by 1 when decrement action is called', () => {
        initialState.count = 4;
        let nextState = counterSlice(initialState, decrement);
        expect(nextState.count).toBe(3);
    })

    it('should reset to the intial state when reset action is called', () => {
        initialState.count = 100;
        let nextState = counterSlice(initialState, reset);
        expect(nextState.count).toBe(0);
    })

    it('should add the value from payload to state when incrementByAmount action is called', () => {
        let nextState = counterSlice(initialState, incrementByAmount(10));
        expect(nextState.count).toBe(10)
    })
});