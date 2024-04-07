import { store } from '../../../src/app/store';
import { increment } from '../../../src/features/counter/counterSlice';

describe('Redux Store', () => {
    it('should handle increment action', () => {
        store.dispatch(increment());
        const currentState = store.getState();
        expect(currentState.counter.count).toBe(1);
    });
});