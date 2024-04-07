import React from "react";
import AddPostForm from "../../../src/features/posts/AddPostForm";
import { Provider, useDispatch, useSelector } from "react-redux";
import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import { postAdded } from "../../../src/features/posts/postSlice";
import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../../../src/features/posts/postSlice";
import '@testing-library/jest-dom'

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

describe('Add Post Form', () => {
    let store, mockDispatch, userSelectors;

    const renderedComponent = () => {
        render(<Provider store={store}>
            <AddPostForm />
        </Provider>);
    }

    beforeEach(() => {
        mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);

        store = configureStore({
            reducer: {
                'posts': postSlice
            }
        });

        userSelectors = [{
            id: 0,
            name: 'leo'
        }]

        useSelector.mockReturnValue(userSelectors);
    });

    afterEach(() => {
        store = null;
    })

    it('should render component labels and defaults', () => {
        renderedComponent();
        expect(screen.getByText('Add a new Posts')).toBeInTheDocument();
        expect(screen.getByText('Post Title:')).toBeInTheDocument();
        expect(screen.getByText('Content:')).toBeInTheDocument();
        expect(screen.getByText('Save Post')).toBeInTheDocument();
    });

    it('should call addPost dispatch when user click on Save Posts', () => {
        renderedComponent();
        const btn = screen.getByText('Save Post');
        const postTitleInput = screen.getByRole('textbox', { name: 'Post Title:' });
        const postAuthorInput = screen.getByRole('combobox', { name: 'Select an Author:' });
        const postContentInput = screen.getByRole('textbox', { name: 'Content:' });


        fireEvent.change(postTitleInput, { target: { value: 'hello world' } })
        fireEvent.change(postAuthorInput, { target: { value: 0 } }); // Adjust '1' to match a valid userId
        fireEvent.change(postContentInput, { target: { value: 'hi' } })


        expect(btn).not.toBeDisabled();

        fireEvent.click(btn);

        expect(useDispatch(postAdded)).toHaveBeenCalled();
        expect(useDispatch(postAdded)).toHaveBeenCalledTimes(1)
        expect(useDispatch(postAdded).mock.calls[0][0].payload.title).toBe('hello world')
        expect(useDispatch(postAdded).mock.calls[0][0].payload.content).toBe('hi')

        expect(postTitleInput.value).toBe('')
        expect(postAuthorInput.value).toBe('')
        expect(postContentInput.value).toBe('')
    })

    it('button should be disabled if inputs have not been changed', () => {
        renderedComponent();

        const postTitleInput = screen.getByRole('textbox', { name: 'Post Title:' });
        const postContentInput = screen.getByRole('textbox', { name: 'Content:' });


        fireEvent.change(postTitleInput, { target: { value: 'hello world' } })
        fireEvent.change(postContentInput, { target: { value: 'hi' } })

        const btn = screen.getByText('Save Post');
        expect(btn).toBeDisabled();

        fireEvent.click(btn);
        expect(useDispatch(postAdded)).not.toHaveBeenCalled();
    });
})