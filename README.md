# Uptobox-TS
![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)
[![NPM Version](https://badgen.net/npm/v/uptobox-ts)](https://www.npmjs.com/package/uptobox-ts)
![Author](https://img.shields.io/badge/author-Paypito-red)

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
### Get the remaining time to download
```typescript
import { UptoboxApi, Uptobox } from 'uptobox-ts';

// Will return the remaining time for account's users
await uptobox.getRemainingTime('https://uptobox.com/XXXXXXXXXXXX')
// Will return the remaining time for guest users
await uptobox.getRemainingTime('https://uptobox.com/XXXXXXXXXXXX', false)
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
### [getFilesInfo](https://docs.uptobox.com/#retrieve-file-informations)
```typescript
import { UptoboxApi } from 'uptobox-ts';

await UptoboxApi.getFilesInfo(fileCodeOne, fileCodeTwo, ...);
```
### [getUserData](https://docs.uptobox.com/#retrieve-user-data)
```typescript
import { UptoboxApi } from 'uptobox-ts';

await UptoboxApi.getUserData(token);
```
## Features
- Download a file
- Retrieve the remaining time for the download
- More features to come in the future
### APIs checklist
  - [x] [getWaitingToken](https://docs.uptobox.com/#get-a-waiting-token)
  - [x] [getDownloadLink](https://docs.uptobox.com/#get-the-download-link)
  - [x] [getFilesInfo](https://docs.uptobox.com/#retrieve-file-informations)
  - [x] [getUserData](https://docs.uptobox.com/#retrieve-user-data)
  - [ ] [enableSSLDownload](https://docs.uptobox.com/#ssl-download)
  - [ ] [enableDirectDownload](https://docs.uptobox.com/#direct-download)
  - [ ] [enableSecurityLock](https://docs.uptobox.com/#security-lock)
  - [ ] [convertPoint](https://docs.uptobox.com/#point-conversion)
  - [ ] [createVoucher](https://docs.uptobox.com/#create-voucher)
  - [ ] [getFolderContent](https://docs.uptobox.com/#retrieve-files-in-public-folder)
  - [ ] [getFilesAndFolders](https://docs.uptobox.com/#retrieve-files-and-folders)
  - [ ] [updateFileInfo](https://docs.uptobox.com/#update-file-informations)
  - [ ] [updateFilesInfo](https://docs.uptobox.com/#update-multiple-file-39-s-public-option)
  - [ ] [moveFolder](https://docs.uptobox.com/#move-a-folder-to-another-location)
  - [ ] [moveFiles](https://docs.uptobox.com/#move-one-or-multiple-files-to-another-location)
  - [ ] [copyFiles](https://docs.uptobox.com/#copy-one-or-multiple-files-to-another-location)
  - [ ] [renameFolder](https://docs.uptobox.com/#rename-a-folder)
  - [ ] [createFolder](https://docs.uptobox.com/#create-a-folder)
  - [ ] [deleteFiles](https://docs.uptobox.com/#delete-one-or-multiple-files)
  - [ ] [deleteFolder](https://docs.uptobox.com/#delete-a-folder)
  - [ ] [getUploadLink](https://docs.uptobox.com/#retrieve-an-upload-url)
## License
Distributed under the MIT License. See LICENSE for more information.