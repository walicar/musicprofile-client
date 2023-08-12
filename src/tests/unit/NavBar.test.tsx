import { render, screen } from "@testing-library/react";
import NavBar from "../../components/navbar/NavBar";
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
    const div = document.createElement('div');
    render(<BrowserRouter><NavBar /></BrowserRouter>);
});