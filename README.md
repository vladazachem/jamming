# Jamm

**Jamm** is a web application that allows users to search for music tracks using the Spotify API, create custom playlists, and manage tracks all within an intuitive user interface. This app demonstrates the integration of the Spotify Web API and React Router to handle user authentication, API requests, and dynamic page navigation.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)
- [Technologies Used](#technologies-used)
- [Acknowledgements](#acknowledgements)


## Features

- **User Authentication**: Log in via Spotify to access your Spotify data.
- **Search Tracks**: Search for tracks by title or artist.
- **Create Playlists**: Create and customize playlists with selected tracks.
- **Manage Tracks**: Add or remove tracks from the playlist.
- **Save Playlists**: Save created playlists to your Spotify account.


## Installation

To run this project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/jamming.git
   cd jamming

  Make sure to replace `your-username` with your actual GitHub username.
  
2. **Install dependencies**:

   ```bash
   npm install

3. **Run the application**:

   ```bash
   npm start

4. **Set up Spotify Application**:

- Create a new Spotify Developer Application at Spotify Developer Dashboard.
- Replace the `CLIENT_ID` in Welcome.js with your Spotify Application Client ID.


## Usage

- Login: Click the "Log in" button to authenticate with your Spotify account.
- Search for Tracks: Use the search bar to find tracks by artist or title.
- Create and Manage Playlists: Add tracks to your playlist, remove them, and save your playlist to Spotify.


## Project Structure
- `src/components/Welcome.js`: Handles Spotify authentication and user login.
- `src/components/Home.js`: Displays the main user interface for searching and managing tracks and playlists.
- `src/components/Header/Header.js`: Contains the header component.
- `src/components/SearchBar/SearchBar.js`: Provides the search bar component for user input.
- `src/components/SearchResults/SearchResults.js`: Displays the search results from Spotify.
- `src/components/Playlist/Playlist.js`: Manages the user's custom playlist.


## Components Overview

- **Welcome** Manages user login via Spotify OAuth and handles token storage and redirection.
- **Home**: The main component that provides functionality to search for tracks, manage playlists, and handle user interactions.
- **SearchBar**: A component for capturing user search input.
- **SearchResults**: Displays search results fetched from the Spotify API.
- **Playlist**: Allows users to manage their custom playlists (add, remove, save).

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing and navigation within the app.
- **Spotify API**: To fetch track data and manage user playlists.
- **CSS Modules**: For component-specific styling.

## Acknowledgements
- Gratitude to Spotify for providing the API that makes this application possible.
- Gratitude to Codecademy for their educational resources and learning opportunities that helped in mastering the technologies used in this project. 
