import type { IAuthorFields } from '../generated/contentful';
import { Asset } from './global';

export interface AuthorCollection<T extends object> {
  authorsCollection: {
    items: ReadonlyArray<T>;
  };
}

export interface Author extends Omit<IAuthorFields, 'profilePicture'> {
  profilePicture: Asset;
}

export interface AuthorCompact extends Omit<Author, 'description'> {}
