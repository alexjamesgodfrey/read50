import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <Auth0Provider
    domain="dev-rtb0ue8q.us.auth0.com"
    clientId="8WjM6U2lIKjte5t7Z9FQ3G05DK0Y9wrF"
    redirectUri="http://localhost:3000/#/search"
  >
    <CookiesProvider>
    <App />
    </CookiesProvider>
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
