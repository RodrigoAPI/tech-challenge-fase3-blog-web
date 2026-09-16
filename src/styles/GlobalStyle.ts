import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: #ed145b;
    --primary-hover: #c40e49;
    --bg-dark: #0f172a;
    --bg-card: #1e293b;
    --bg-card-hover: #334155;
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --border-color: #334155;
    --danger: #ef4444;
    --success: #10b981;
    --radius: 12px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    min-height: 100vh;
    line-height: 1.6;
  }

  h1, h2, h3 {
    color: #ffffff;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    font-family: inherit;
  }
`;
