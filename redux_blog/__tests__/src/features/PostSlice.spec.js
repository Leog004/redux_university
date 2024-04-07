import postSlice, { postAdded, reactionAdded } from "../../../src/features/posts/postSlice";
describe('posts slice', () => {

    let initialState = []

    beforeEach(() => {
        initialState = [
            {
                id: '1',
                title: 'learning react',
                content: 'Ive heard good things',
                date: '2021-01-01',
                reactions: { thumbsUp: 0 },
                userId: 'leo'
            },
        ]
    });

    it('should add a posts to the list', () => {
        const nextState = postSlice(initialState, postAdded('title', 'content', 'user'));
        expect(nextState.length).toBe(2)
    });

    it('should increment a reaction from same user', () => {
        const nextState = postSlice(initialState, reactionAdded({postId: '1', reaction: 'thumbsUp'}));
        expect(nextState[0].reactions.thumbsUp).toBe(1)
    });

    it('should not increment a reaction if post id is not found', () => {
        const nextState = postSlice(initialState, reactionAdded({postId: '2', reaction: 'thumbsUp'}));
        expect(nextState[0].reactions.thumbsUp).toBe(0)
    });
});