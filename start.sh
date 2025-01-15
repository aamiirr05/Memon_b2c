#!/bin/bash

# Start frontend
cd frontend
npm run dev &

# Start backend
cd ../backend
npm run dev &

# Wait for both processes to finish
wait
