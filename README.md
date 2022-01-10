[![Tests](https://github.com/jclaveau/nestjs-experiments/actions/workflows/tests.yml/badge.svg)](https://github.com/jclaveau/nestjs-experiments/actions/workflows/tests.yml)
[![Format](https://github.com/jclaveau/nestjs-experiments/actions/workflows/format.yml/badge.svg?event=push)](https://github.com/jclaveau/nestjs-experiments/actions/workflows/format.yml)
[![codecov](https://codecov.io/gh/jclaveau/nestjs-experiments/branch/main/graph/badge.svg?token=C5ElNWNc41)](https://codecov.io/gh/jclaveau/nestjs-experiments)
## Description (WIP)

Expirementing architectures and features with [Nest](https://github.com/nestjs/nest) in real CI conditions.

Goals:
- Full end to end tests
- Full coverage
- Formatted with [ESlint](https://eslint.org/) (No prettier to avoid remain free of opinions).
- Automatically updated dependencies (Handled by [Renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate/))
- [12-Factors](https://12factor.net/)
- [Inversion of Control](https://www.tutorialsteacher.com/ioc/inversion-of-control)

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## License

Nest is [MIT licensed](LICENSE).
