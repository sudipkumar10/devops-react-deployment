# Production-Ready DevOps Deployment Project

An end-to-end DevOps project demonstrating automated CI/CD, Docker containerization, container security hardening, and production deployment practices.

## Project Overview

This project demonstrates an industry-oriented DevOps workflow, from source code management to containerized application deployment.

The application uses React + TypeScript + Vite as a lightweight sample workload. The primary focus is DevOps automation, security, reliability, and deployment.

## Architecture

```text
Developer
    |
    v
GitHub Repository
    |
    v
GitHub Actions CI
    |
    +--> Install Dependencies
    +--> ESLint
    +--> Production Build
    |
    v
Docker Multi-Stage Build
    |
    v
Nginx Production Container
    |
    v
Application Deployment
```

## Technology Stack

| Category           | Technology                          |
| ------------------ | ----------------------------------- |
| Operating System   | Ubuntu 24.04                        |
| Frontend           | React, TypeScript, Vite             |
| Version Control    | Git, GitHub                         |
| CI/CD              | GitHub Actions                      |
| Containerization   | Docker                              |
| Web Server         | Nginx                               |
| Container Registry | GitHub Container Registry (planned) |
| Deployment         | Oracle Cloud VPS (planned)          |

## CI Pipeline

GitHub Actions automatically performs:

- Dependency installation using `npm ci`
- Code linting using ESLint
- Production build using Vite
- Pull request validation

Workflow location:

`.github/workflows/ci.yml`

## Docker Implementation

The application uses a multi-stage Docker build.

### Stage 1: Builder

- Uses Node.js 22 Alpine.
- Installs dependencies.
- Builds the React application.

### Stage 2: Production

- Uses Nginx Alpine.
- Copies production build files.
- Runs Nginx as a dedicated non-root user.

### Nginx Configuration

Custom Nginx configuration provides:

- Static file serving.
- React SPA routing fallback.
- Application health endpoint at `/health`.

## Container Security Hardening

The production container has been tested with the following security controls:

| Security Control                | Configuration       |
| ------------------------------- | ------------------- |
| Non-root execution              | `appuser`           |
| Read-only filesystem            | `--read-only`       |
| Temporary writable storage      | `tmpfs`             |
| Linux capabilities              | `--cap-drop=ALL`    |
| Privilege escalation protection | `no-new-privileges` |
| Memory limit                    | 128 MB              |
| CPU limit                       | 0.5 core            |
| Process limit                   | 100                 |
| Docker health monitoring        | `HEALTHCHECK`       |

## Local Development

Install dependencies:

```bash
npm ci
```

Run development server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Build production application:

```bash
npm run build
```

## Docker Deployment

Build the image:

```bash
docker build -t devops-react-app:v3 .
```

Run the hardened container:

```bash
docker run -d \
  --name react-app \
  -p 8082:8080 \
  --read-only \
  --tmpfs /var/cache/nginx:rw,noexec,nosuid,size=16m,uid=100,gid=102 \
  --tmpfs /var/run:rw,noexec,nosuid,size=4m,uid=100,gid=102 \
  --tmpfs /tmp:rw,noexec,nosuid,size=8m,uid=100,gid=102 \
  --cap-drop=ALL \
  --security-opt=no-new-privileges:true \
  --memory=128m \
  --cpus=0.5 \
  --pids-limit=100 \
  devops-react-app:v3
```

## Health Verification

Check container status:

```bash
docker ps
```

Check application health:

```bash
curl http://localhost:8082/health
```

Expected response:

```text
healthy
```

## Project Roadmap

- [x] React application initialization
- [x] Git and GitHub workflow
- [x] GitHub Actions CI pipeline
- [x] Docker multi-stage build
- [x] Custom Nginx configuration
- [x] Non-root container execution
- [x] Docker health checks
- [x] Read-only filesystem
- [x] Linux capability hardening
- [x] Resource limits
- [ ] GitHub Container Registry integration
- [ ] Automated deployment to Oracle Cloud VPS
- [ ] HTTPS with Let's Encrypt
- [ ] Monitoring and logging
- [ ] Backup and recovery
- [ ] Infrastructure as Code using Terraform
- [ ] Configuration management using Ansible

## Learning Objectives

This project is designed to demonstrate practical understanding of:

- CI/CD automation
- Docker image optimization
- Container security
- Linux administration
- Production deployment
- Monitoring and reliability
- Infrastructure automation

---

**Project Status:** In Progress

**Focus:** Production-oriented DevOps engineering.
