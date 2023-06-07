import { HTMLAttributeAnchorTarget } from 'react';

interface Share {
  url: string | URL;
}

interface ShareMetaData {
  title?: string;
  target: HTMLAttributeAnchorTarget;
  hashtags?: Array<string>;
  text?: string;
}

type ShareData = Share & ShareMetaData;

export const cleanString = (url: string) =>
  url
    .replace(/[^A-Za-z|0-9|\s|/]/g, '')
    .replace(/\s/g, '-')
    .toLowerCase();

export const verifyUrl = (share: Share) => {
  if (typeof window !== 'undefined') {
    return share.url || window.location.href;
  }
  return share;
};

export const shareWindow = (
  shareData: Share & Pick<ShareMetaData, 'target'>
) => {
  if (typeof window !== 'undefined') {
    const y = window.top!.outerHeight / 2 + window.top!.screenY - 500 / 2;
    const x = window.top!.outerWidth / 2 + window.top!.screenX - 500 / 2;
    window.open(
      shareData.url,
      shareData.target,
      shareData.target === '_blank'
        ? `location,status,scrollbars,resizable,width=500,height=500,left=${x},top=${y}`
        : undefined
    );
  }
};

export const copyText = (url?: string) => {
  if (typeof window !== 'undefined') {
    url = url || window.location.href;
    try {
      navigator.clipboard.writeText(url);
      const elem = document.createElement('textarea');
      elem.value = url;
      document.body.appendChild(elem);
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);
    } catch (e) {
      navigator.clipboard.writeText(url);
    }
  }
};

export const facebook = (data: ShareData) => {
  const url = verifyUrl(data);
  shareWindow({
    target: data.target,
    url: `https://www.facebook.com/sharer.php?u=${url}`,
  });
};
export const linkedin = (data: ShareData) => {
  const url = verifyUrl(data);
  shareWindow({
    target: data.target,
    url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  });
};
export const whatsapp = (data: ShareData) => {
  const url = verifyUrl(data);
  shareWindow({
    target: data.target,
    url: `whatsapp://send?text=${url}`,
  });
};
export const reddit = (data: ShareData) => {
  const url = verifyUrl(data);
  const title = data.title || '';
  shareWindow({
    target: data.target,
    url: `https://reddit.com/submit?url=${url}&title=${title}`,
  });
};

export const twitter = (data: ShareData) => {
  const url = verifyUrl(data);
  const text = data.text || '';
  const hashtags = data.hashtags || [];
  shareWindow({
    target: data.target,
    url: `https://twitter.com/intent/tweet?url=${url}&text=${text.substring(
      0,
      100
    )}&hashtags=${hashtags.join()}`,
  });
};
