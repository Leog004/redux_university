import React from 'react'
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';
import counterSlice from '../../src/features/counter/counterSlice';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockReturnValue(0),
}));

describe('App file', () => {
    let store = {};

    beforeEach(() => {
        store = configureStore({
            reducer: counterSlice
        });
        useSelector.mockReturnValue(0);
    })

    const renderComponent = () => {
         render(
            <Provider store={store}>
                <App />
            </Provider>
         )
    }

    it('should show the counter default value on startup', () => {
        renderComponent();
        expect(screen.getByTestId('counter_count')).toHaveTextContent('0');
    });

    it('should not show the counter value if no value is present', () => {
        useSelector.mockReturnValue(null);
        renderComponent();
        expect(screen.getByTestId('counter_count')).toHaveTextContent('');
    });
});