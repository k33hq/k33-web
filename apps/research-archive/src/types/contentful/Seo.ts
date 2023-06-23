import { ISeoMetadataFields } from '../generated/contentful';
import { Asset } from './global';

export interface SeoData
  extends Pick<ISeoMetadataFields, 'title' | 'description'> {
  image: Asset;
}
