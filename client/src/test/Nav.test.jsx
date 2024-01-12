import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "../Components/Nav"; 

test("renders Nav component", () => {
  render(
    <Router>
      <Nav />
    </Router>
  );

  // Check if the "Movie Madness" link is present
  const logoLink = screen.getByText(/movie madness/i);
  expect(logoLink).toBeInTheDocument();

  // Check if the "Log In" button is present initially
  const loginButton = screen.getByText(/log in/i);
  expect(loginButton).toBeInTheDocument();

  // Check if the mobile menu is not visible initially
  const mobileMenu = screen.queryByTestId("mobile-menu");
  expect(mobileMenu).not.toBeInTheDocument();

  // Trigger the mobile menu by clicking the hamburger icon
  const hamburgerIcon = screen.getByLabelText(/toggle navigation/i);
  fireEvent.click(hamburgerIcon);

  // Check if the mobile view displays
  const mobileMenuAfterClick = screen.getByTestId("mobile-menu");
  expect(mobileMenuAfterClick).toBeInTheDocument();

  // Check if log in is in mobile view
  const accountLinkInMobileMenu = screen.getByTestId("account-link");
  const accountButtonInMobileMenu =
    accountLinkInMobileMenu.querySelector("button");

  expect(accountButtonInMobileMenu).toHaveTextContent(/Log In/i);
  expect(accountButtonInMobileMenu).toBeInTheDocument();
});
