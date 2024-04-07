import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import userSlice from '../../src/features/users/userSlice';
import postSlice from '../../src/features/posts/postSlice';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('App file', () => {
    let store = {};
    let posts = [{
        id: '1',
        title: 'learning react',
        content: 'Ive heard good things',
        date: '',
        reactions: { thumbsUp: 0 }
    },];

    beforeEach(() => {
        store = configureStore({
            reducer: {
                'users': userSlice,
                'posts': postSlice
            }
        });
    })

    const renderComponent = () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
    }

    it('should show page title and render correctly', () => {
        useSelector.mockReturnValue(posts)
        renderComponent();
        expect(screen.getByText('Add a new Posts')).toBeInTheDocument();
    });

    it('should show user posts', () => {
        useSelector.mockReturnValue(posts)
        renderComponent();
        expect(screen.getByText('learning react')).toBeInTheDocument();
    });
});