# JWT UI

A simple frontend application that allows users to sign in with email/password using Supabase authentication and copy their JWT token to the clipboard. This JWT token can then be used for authenticated API calls from scripts.

## Features

- Email/password authentication with Supabase
- Copy JWT token to clipboard
- API documentation page with curl command examples
- JSON payload editor
- Support for both inline and file-based payloads

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   cd frontend
   yarn install
   ```
3. Create a `.env` file in the frontend directory with your Supabase credentials:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Start the development server:
   ```
   yarn start
   ```

## Usage

1. Sign up or sign in with your email and password
2. On the dashboard, you can copy your JWT token to the clipboard
3. Navigate to the API Documentation page to view example API calls
4. Export your JWT token as an environment variable
5. Use the provided curl commands to make authenticated API calls

## Technologies Used

- React
- Supabase Authentication
- Tailwind CSS
- React Router
- React Hot Toast
