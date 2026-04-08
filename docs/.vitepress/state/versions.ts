import { SupportedVersion, Version } from './typing';

export const supportedVersions: SupportedVersion[] = [
  {
    label: 'v6.x',
    version: Version.v6
  },
  {
    label: 'v7.x',
    version: Version.latest
  }
];

export const versionOptions: SupportedVersion[] = supportedVersions;