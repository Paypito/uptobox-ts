# Uptobox-TS

A Node library allowing to use uptobox APIs easily.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install.

```bash
npm install uptobox-ts
```

## Usage

```typescript
import { UptoboxApi, Uptobox } from 'uptobox-ts';
```

## Quick Example
### Download a file
```typescript
import { UptoboxApi, Uptobox } from 'uptobox-ts';

Uptobox.setToken(TOKEN); // User token provided by Uptobox

// Will download the file (premium or non-premium) in the current folder
await uptobox.downloadFile('https://uptobox.com/XXXXXXXXXXXX')
```
## APIs
### [getWaitingToken](https://docs.uptobox.com/#get-a-waiting-token)
```typescript
import { UptoboxApi } from 'uptobox-ts';

// Password is optionnal
await UptoboxApi.getWaitingToken(token, fileCode, password?)
```
_Premium users get the download link directly_
### [getDownloadLink](https://docs.uptobox.com/#get-the-download-link)
```typescript
import { UptoboxApi } from 'uptobox-ts';

// For non-premium users
await UptoboxApi.getDownloadLink(token, fileCode, waitingToken)
```

## License
[MIT](https://choosealicense.com/licenses/mit/)