# File Upload Plugin

This plugin provides a simple, user-friendly interface for uploading files, including support for large files up to 1GB, and displaying a list of uploaded files. It consists of a client-side HTML/JavaScript implementation and a server-side Node.js application.

## Features

- File selection and upload functionality
- Support for large file uploads (up to 1GB)
- Preservation of original file names
- Progress bar for upload status
- List view of uploaded files
- Error handling and success notifications

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- npm (Node Package Manager) installed

## Installation

1. Clone this repository to your local machine:
   ```
   git clone 
   ```

2. Navigate to the project directory:
   ```
   cd file-upload-plugin
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

## Configuration

1. Open the `index.html` file and ensure the `API_URL` constant is set to your server's address:
   ```javascript
   const API_URL = 'http://localhost:3000';
   ```

2. Make sure you have an 'uploads' directory in the same folder as your server.js file. If not, create one:
   ```
   mkdir uploads
   ```

## Usage

1. Start the server:
   ```
   node server.js
   ```

2. Open the `index.html` file in a web browser, or serve it using a local development server.

3. Use the interface to select and upload files. The list of uploaded files will be displayed below the upload form.

## Handling Large Files

This plugin is configured to handle file uploads up to 1GB in size. Key points to note:

- The server uses streaming to process large files efficiently.
- Original file names are preserved, with a unique timestamp added to prevent overwriting.
- The server timeout is set to 10 minutes to accommodate large file uploads.
- There's a 1GB file size limit set on the server.

Keep in mind the following when working with large files:

- Ensure your server has sufficient disk space to store the uploaded files.
- For files larger than 1GB, you'll need to adjust the `fileSize` limit in the server code.
- In production environments, consider implementing additional security measures and file validation.

## API Endpoints

The server provides the following API endpoints:

- `POST /upload`: Upload a file (up to 1GB)
- `GET /files`: Retrieve a list of uploaded files

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Express.js for the server framework
- Multer for handling file uploads
- Tailwind CSS for styling
- Lucide for icons
