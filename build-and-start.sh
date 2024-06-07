#!/bin/bash

# Navigate to the client folder and build it
cd client
bun build

# Navigate back to the root directory
cd ..

# Run migrations and start the server
bun run migrate && bun run start
