# 𝕄𝕪𝕥𝕙𝕨𝕖𝕒𝕧𝕖𝕣 𝕀𝕟𝕔.

File Managed by Solo™ only.

# Unity Authentication Integration Guide

This document outlines the steps and requirements for the Unity game client to integrate with the website-based Auth0 authentication flow.

## 1. Authentication Flow Overview

The login process is designed to use a web browser for authentication, providing a secure and familiar experience for the user. Here is the step-by-step flow:

1.  The **Unity Game** initiates the login process by opening the user's default web browser to the Auth0 login page.
2.  The **User** logs in or creates an account using the Auth0 interface in their browser.
3.  Upon successful authentication, **Auth0** redirects the user's browser to a special, hidden page on our website.
4.  This **Webpage** automatically extracts the authentication token from the URL.
5.  The **Webpage** then sends this token to a local HTTP server that the Unity game must be running.
6.  The **Unity Game** receives the token from its local server, saves it, and the user is now logged in. The user can then close the web browser.

## 2. Auth0 Application Configuration

For this flow to work, the **Redirect URI** must be correctly configured in your Auth0 Application settings.

-   Go to your Auth0 dashboard, navigate to **Applications**, and select the application used for the game.
-   In the settings, add the following URL to the **"Allowed Callback URLs"** field:

```
https://mythweave.net/supersecrettunnal
```

## 3. Unity HTTP Listener Requirements

This is the most critical part of the integration on the game client's side. The Unity game must run a simple local HTTP server to receive the token from the webpage.

#### Endpoint Details
-   **Address:** The listener must be running on `http://localhost:4567`
-   **Path:** It must listen for `GET` requests on the `/token` path.
-   **Data Format:** The access token will be sent as a URL query parameter named `access_token`.
    -   Example request from the webpage: `http://localhost:4567/token?access_token=eyJhbGciOi...`

#### CORS Header (MANDATORY)
Modern web browsers have a security feature called Cross-Origin Resource Sharing (CORS) that will block the request from our website to `localhost` unless your Unity listener explicitly allows it.

Your listener's HTTP response **MUST** include the following header:

```
Access-Control-Allow-Origin: https://mythweave.net
```

Without this exact header in the response, the browser will refuse to send the token, and the login will fail.

#### Response Handling
-   **On Success:** If the token is received and processed correctly, your listener should respond with a `200 OK` status code. The webpage will then display a "Success" message to the user.
-   **On Failure:** If there is an issue on the game's side, respond with an error status code (e.g., `400 Bad Request` or `500 Internal Server Error`). The webpage will detect this and show a relevant error message to the user, which is helpful for debugging.

## 4. Unity Game Logic

Once the HTTP listener receives the token:
1.  Parse the `access_token` from the incoming request's query string.
2.  Save this token securely to `PlayerPrefs` or another local storage solution.
3.  This token can now be used for all subsequent authenticated requests to the game's backend services (like SpaceTimeDB).

## Integration Checklist
-   [ ] Auth0 "Allowed Callback URLs" is set to the correct `/supersecrettunnal` URL.
-   [ ] Unity game runs an HTTP listener on `http://localhost:4567`.
-   [ ] The listener's response includes the `Access-Control-Allow-Origin` header pointing to the live website domain.
-   [ ] The listener correctly parses the `access_token` query parameter from the `/token` endpoint.
-   [ ] The parsed token is successfully saved to PlayerPrefs for session management.