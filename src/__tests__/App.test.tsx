import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
    it('renders the app', () => {
        render(<App />);
        expect(screen.getByText('Trivia Game')).toBeInTheDocument(); // Update the text to match the actual content
    });
});