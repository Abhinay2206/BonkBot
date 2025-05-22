# Contributing to BONK Bot

First off, thank you for considering contributing to BONK Bot! It's people like you that make BONK Bot such a great tool.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed APIs, update the documentation.
4. Ensure the test suite passes.
5. Make sure your code lints.

## Pull Request Process

1. Update the README.md with details of changes to the interface, if applicable.
2. Update the documentation with details of any new environment variables, exposed ports, etc.
3. The PR will be merged once you have the sign-off of at least one other developer.

## Project Structure

```
bonk-bot/
├── bonk-api/          # Backend API
│   ├── src/           # Source files
│   ├── tests/         # Test files
│   └── package.json   # Backend dependencies
└── web-app/           # Frontend application
    ├── src/           # Source files
    ├── public/        # Static files
    └── package.json   # Frontend dependencies
```

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm
- Git
- A Solana wallet (Phantom or Solflare)

### Setting Up Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/Abhinay2206/BonkBot.git
   ```
3. Follow the setup instructions in the README.md

## Coding Standards

### JavaScript/TypeScript

- Use TypeScript for new code
- Follow the existing code style
- Use ESLint and Prettier configurations provided in the project
- Write meaningful variable and function names
- Add JSDoc comments for functions and complex logic

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop-types or TypeScript interfaces
- Follow the container/presenter pattern where applicable

### API Development

- Follow RESTful conventions
- Include proper error handling
- Add input validation
- Document all endpoints using OpenAPI/Swagger
- Write unit tests for new endpoints

## Testing

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Include both positive and negative test cases
- Mock external services in tests

## Git Commit Guidelines

Format: `<type>(<scope>): <subject>`

Types:
- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that don't affect the meaning of the code
- refactor: Code change that neither fixes a bug nor adds a feature
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools

Example:
```
feat(auth): add wallet signature verification
```

## Reporting Bugs

When reporting bugs, please include:

1. Your operating system name and version
2. Browser and version
3. Detailed steps to reproduce the bug
4. What you expected would happen
5. What actually happened

## Feature Requests

We love feature requests! Please provide:

1. Clear description of the feature
2. Why you (and others) would want this feature
3. Possible implementation details
4. Whether you'd be willing to help implement it

## Questions?

Feel free to:
- Open an issue
- Join our Discord community
- Contact the maintainers directly


