export interface Navigation {
  key: string;
  label: string;
  url: string;
  children?: ReadonlyArray<Navigation>;
}

export interface AppStructure {
  navigation: ReadonlyArray<Navigation>;
}

export interface PageTab {
  key: string;
  label: string;
}

export type PageTabs = Array<PageTab>;
