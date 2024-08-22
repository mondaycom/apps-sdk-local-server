# Apps SDK Local Server

This project provides a local server environment for developing and testing applications with the monday code SDK. It emulates the behavior of the SDK in a production environment, offering identical capabilities and API endpoints, allowing seamless transitions between your local setup and the production SDK.

## Getting Started

Follow the steps below to get a local copy of this project up and running on your machine for development and testing.

### Prerequisites

- **Docker**: Ensure Docker is installed on your machine. You can download it from [here](https://www.docker.com/get-started).

### Running the Application

1. **Configure the Docker Volume:**

   - Open the `docker-compose.yml` file.
   - Replace `<VOLUME_FOR_LOCAL_SERVER_IN_LOCAL_MACHINE>` with the path to your local machine's desired volume.
   - Set the `VOLUME_PATH` environment variable in the same file to match the volume path.

2. **Start the Docker Container:**

   Run the following command in your terminal:

   ```bash
   docker compose up
   ```

3. **Access the Application:**

   Once the container is up and running, your application will be accessible at `http://localhost:59999`.

## Capabilities Requiring Configuration

### Queue Management

This server includes a queue management system for handling time-consuming tasks efficiently in the background, improving both performance and reliability. The queue processes tasks in the order they are received and retries in case of failures, ensuring no task is lost.

To configure the queue capability:

- **`PUB_SUB_DEV_APP_SERVICE_URL`**: URL of the local server that handles task execution.
- **`PUB_SUB_RETRY_INTERVAL_IN_SECONDS`**: Time interval (in seconds) for retrying failed requests.

These environment variables are set within the `docker-compose.yml` file.

## Development Routes

The local server provides additional routes to facilitate development:

1. **Set Environment Variable**:

   - **Endpoint:** `/test/environments/{name}`
   - **Method:** `PUT`
   - **Description:** Sets the environment variable `{name}` to the value provided in the request body.

2. **Set Secret**:
   - **Endpoint:** `/test/secrets/{name}`
   - **Method:** `PUT`
   - **Description:** Sets the secret `{name}` to the value provided in the request body.

## License

This project is licensed under the MIT License. For more details, see the `LICENSE.md` file.
