export enum Version {
  v6 = 'v6',
  latest = 'latest',
}

export interface SupportedVersion {
  label: string;
  version: Version;
}

export interface SupportedLanguage {
  label: string;
  lang: string;
  baseLang?: string;
  path: string;
  version: Version;
  outlineTitle: string;
}