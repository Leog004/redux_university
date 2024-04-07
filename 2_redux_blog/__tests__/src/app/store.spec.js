import { store } from '../../../src/app/store';
import { postAdded } from '../../../src/features/posts/postSlice';

describe('Redux Store', () => {
    it('should handle increment action', () => {
        store.dispatch(postAdded("", "", ""));
        const currentState = store.getState();
        expect(currentState.posts.length).toBe(3);
    });
});