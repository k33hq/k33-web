export interface TagCollection<T extends object> {
  tagsCollection: {
    items: ReadonlyArray<T>;
  };
}
