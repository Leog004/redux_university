import React from 'react'
import Counter from "../../../src/features/counter/Counter";
import '@testing-library/jest-dom'
import { screen, render, fireEvent } from '@testing-library/react';
import { increment, decrement, reset, incrementByAmount } from '../../../src/features/counter/counterSlice';
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import counterSlice from "../../../src/features/counter/counterSlice";

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn().mockReturnValue(0),
}));

describe('Counter JS', () => {

    let store;
    const mockDispatch = jest.fn();

    const renderedComponent = () => {
        render(<Provider store={store}>
            <Counter />
        </Provider>);
    }

    beforeEach(() => {
        store = configureStore({
            reducer: counterSlice,
        });
        useSelector.mockReturnValue(0);
        useDispatch.mockReturnValue(mockDispatch);
    })

    afterEach(() => {
        store = null;
        mockDispatch.mockReset();
    })

    it('should render default values and buttons', () => {
        useSelector.mockReturnValue(10)
        renderedComponent();
        expect(screen.getByTestId('counter_count')).toHaveTextContent('10');
        expect(screen.getByText('+')).toBeInTheDocument();
        expect(screen.getByText('-')).toBeInTheDocument();
        expect(screen.getByText('Add By Amount')).toBeInTheDocument();
        expect(screen.getByText('Reset')).toBeInTheDocument();
        expect(screen.getByTestId('counter-input')).toHaveValue(1);
    });

    it('should reset the value when reset button is pressed', () => {
        useSelector.mockReturnValue(10);
        renderedComponent();

        expect(screen.getByTestId('counter_count')).toHaveTextContent('10');

        fireEvent.click(screen.getByText('Reset'));

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(reset());
    });

    it('should increment the value when + button is pressed', () => {
        renderedComponent();

        fireEvent.click(screen.getByText('+'));

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(increment());
    });

    it('should descrement the value when - button is pressed', () => {
        renderedComponent();

        fireEvent.click(screen.getByText('-'));

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(decrement());
    });

    it('should increment the value by user amount', () => {

        renderedComponent();

        const input = screen.getByTestId('counter-input');
        
        fireEvent.change(input, {target: {value: '23'}})
        fireEvent.click(screen.getByText('Add By Amount'));

        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(incrementByAmount(23));
    });
});