import React from 'react'
import '@testing-library/jest-dom'
import { screen, render } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useSelector } from "react-redux";
import PostsList from '../../../src/features/posts/PostsList';
import postSlice from '../../../src/features/posts/postSlice';

jest.mock('../../../src/features/posts/ReactionButton', () => () => <button>ReactionButton Component</button>);
jest.mock('../../../src/features/posts/TimeAgo', () => () => <div>TimeAgo</div>)
jest.mock('../../../src/features/posts/PostAuthor', () => () => <div>PostAuthor</div>)

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockReturnValue(0),
}));

describe('Counter JS', () => {

    let store;
    let posts = [];

    const mockDispatch = jest.fn();

    const renderedComponent = () => {
        render(<Provider store={store}>
            <PostsList />
        </Provider>);
    }

    beforeEach(() => {
        store = configureStore({
            reducer: {
                'posts': postSlice
            },
        });
        posts = [{
            id: '1',
            title: 'learning react',
            content: 'Ive heard good things',
            date: '2021-01-01',
            reactions: { thumbsUp: 0 }
        },
        {
            id: '2',
            title: 'Hello World',
            content: 'Hello World',
            date: '2021-02-01',
            reactions: { thumbsUp: 0 }
        },
        ];
        useSelector.mockReturnValue(posts);
    })

    afterEach(() => {
        store = null;
        mockDispatch.mockReset();
    })

    it('renders posts in descending order by date', () => {
        renderedComponent();
        const articles = screen.getAllByRole('article');
        // eslint-disable-next-line testing-library/no-node-access
        const titles = articles.map((article) => article.querySelector('h3').textContent);
        expect(titles).toEqual(['Hello World', 'learning react']); // Expect the newer post to come first
    });

    it('renders no posts is found if posts length is 0', () => {
        useSelector.mockReturnValue([]);
        renderedComponent();

        expect(screen.getByText('No posts found.')).toBeInTheDocument();
    });
});