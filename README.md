# Project Title

This is a Node.js project that uses Docker for containerization. The project is written in TypeScript and uses npm and yarn as package managers.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Node.js
- npm
- yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/<username>/<repository>.git
```

2. Navigate to the project directory:

```bash
cd <repository>
```

3. Install the dependencies:

```bash
npm install
```

or

```bash
yarn install
```

## Running the Application

To run the application, you need to set up the Docker environment. The `docker-compose.yml` file is already provided in the repository.

1. Replace `<VOLUME_FOR_LOCAL_SERVER_IN_LOCAL_MACHINE>` in the `docker-compose.yml` file with the path to the volume on your local machine.

2. Set the `VOLUME_PATH` environment variable in the `docker-compose.yml` file to the same path as the volume path.

3. Run the Docker container:

```bash
docker-compose up
```

## Capabilities that require configuration

### Queue

The queue capability is used to manage the execution of tasks in the application. It is particularly useful for handling tasks that are time-consuming and can be processed in the background. The queue ensures that the tasks are executed in the order they were added and that no task is lost in case of a failure.

The queue capability is implemented using the `PUB_SUB_DEV_APP_SERVICE_URL` and `PUB_SUB_RETRY_INTERVAL_IN_SECONDS` environment variables defined in the `docker-compose.yml` file. The `PUB_SUB_DEV_APP_SERVICE_URL` is the URL of the local server that handles the tasks, and the `PUB_SUB_RETRY_INTERVAL_IN_SECONDS` is the time in seconds to retry failed requests to the local server from the queue.

The queue capability is essential for improving the performance and reliability of the application. It allows the application to handle a large number of tasks efficiently and ensures that all tasks are processed even in case of temporary failures.

The application will be accessible at `http://localhost:59999`.

## GitHub Actions

This repository uses GitHub Actions for CI/CD. The workflow is defined in the `.github/workflows/docker-image.yml` file. It automatically builds and pushes the Docker image to the GitHub Container Registry whenever there's a push to the `master` branch or when the workflow is manually triggered.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
