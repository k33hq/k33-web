export const pageview = (url: string) => {
  //@ts-ignore
  window.gtag('config', process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string, {
    page_path: url,
  });
};

interface AnalyticsEvent {
  action: string;
  category: string;
  label: string;
  value: string;
}

export const event = ({ action, category, label, value }: AnalyticsEvent) => {
  //@ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
