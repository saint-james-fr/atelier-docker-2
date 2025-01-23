# Docker Volumes and Hot Reloading

## Overview

This document explains the underlying mechanisms of Docker volumes and hot reloading in development environments.

## Volume Bind Mounting

Unlike Docker images which use a layered filesystem, volumes operate through bind mounting:

- When mapping `./src:/app/src`, Docker creates a direct reference between the container's `/app/src` directory and your host machine's `./src` directory
- This operates similarly to a symbolic link in Unix systems
- No file copying or difference tracking occurs - it's a direct filesystem connection

## File System Event Handling

### Host Operating System Events

Different operating systems use native file system event notification systems:

| OS      | Event System          |
| ------- | --------------------- |
| Linux   | inotify               |
| macOS   | FSEvents              |
| Windows | ReadDirectoryChangesW |

### Development Workflow

1. Developer modifies a file in `./src` on the host machine
2. Container immediately detects changes through bind mount
3. Development server (e.g., Vite) monitors file system changes
4. Server triggers appropriate rebuild/reload actions

## Key Differences from Docker Images

- Docker images: Use layered filesystem with copy-on-write mechanism
- Docker volumes: Provide direct access to host filesystem
- Development benefit: No copying, diffing, or synchronization overhead

This direct file system access makes volumes significantly more efficient for development workflows.
