# MovieMax React App

## Project Overview

The **MovieMax** project is a single-page, responsive application built using React, designed for movie enthusiasts who want to explore and save information about various movies. This client-side application interfaces with an existing server-side REST API and database, forming a complete full-stack JavaScript project utilizing the MERN stack (MongoDB, Express, React, and Node.js).

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [User Stories](#user-stories)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

### Views & Features

- **Main View:**
  - Returns all movies to the user (each movie item with an image and title).
  - Allows filtering the list of movies with a search feature.
  - Ability to select a movie for more details.
  - Ability to log out.
  - Ability to navigate to Profile View.

- **Single Movie View:**
  - Returns data (image, title, description, genre, director, cast) about a single movie to the user.
  - Allows users to add or remove a movie from their list of favorites.

- **Login View:**
  - Allows users to log in with a username and password.

- **Signup View:**
  - Allows new users to register (username, password, email, date of birth).

- **Profile View:**
  - Displays user registration details.
  - Allows users to update their info (username, password, email, date of birth).
  - Displays favorite movies.
  - Allows users to remove a movie from their list of favorites.
  - Allows existing users to deregister.

## User Stories

- **As a user**, I want to access information about movies so I can learn more about movies I’ve watched or am interested in.
- **As a user**, I want to create a profile so I can save data about my favorite movies.

## Setup and Installation

Follow these steps to get MovieMax up and running on your local machine:

1. **Clone the repository:**

    ```sh
    git clone https://github.com/jdeebs/moviemax-client.git
    ```

2. **Navigate to the project directory:**

    ```sh
    cd moviemax-client
    ```

3. **Install dependencies:**

    ```sh
    npm install
    ```

4. **Run the application:**

    ```sh
    npx parcel public/index.html
    ```

    **Note:** It's recommended to use `npx parcel public/index.html` to ensure your project runs correctly with the appropriate Parcel version and to avoid compatibility issues from global installations.

## Usage

1. Open your browser and navigate to `http://localhost:1234` to use the app locally.
2. Create an account or log in with existing credentials.
3. Browse through the list of movies, search for specific titles, and view detailed information.
4. Add movies to your list of favorites, and manage your profile information.

## Deployment

The MovieMax app is deployed on Netlify and can be accessed [here](https://jdeebs-moviemax.netlify.app/).

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Make sure to follow the code style and include tests for new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
