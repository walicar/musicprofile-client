import App from "../../App";
import React from 'react';
import store from "../../app/store";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Targets:
 * - Redux token slice
 * - Use mock "spotify api"
 * 
 * Testcases:
 * - Redux state is correctly initialized with existing access-tokens in 
 *   localStorage
 * - validate(): Redux writes new tokens to localStorage when those tokens are 
 *   expired
 *   - must succesfully perform token refreshing
 *   - must only update the access_token if it's expired
 *   - must succesfully write to the database
 * - erase(): token slice state is erased, and removes from localStorage
 * - write(): token slice state is created for a specific service, and is added
 *   to localStroage
 */

describe("token slice integration test", () => {
    const app = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    test("write a token to localStorage", () => {
        expect(false).toBeTruthy();
    });
    test("erase the token from localStorage", () => {
        expect(false).toBeTruthy();
    });
})