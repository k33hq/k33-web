import { AssetFields } from 'contentful';

export interface Asset extends Pick<AssetFields, 'title' | 'description'> {
  url: string;
}
