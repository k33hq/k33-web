import * as React from 'react';

interface BasicListProps {
  data: ReadonlyArray<string>;
}

export const BasicList: React.FC<BasicListProps> = ({ data }) => {
  return (
    <div className="ui-flex ui-flex-col ui-gap-3 ui-pt-3 sm:ui-gap-9 sm:ui-pt-7 ui-justify-center">
      {data.map((point) => (
        <div
          key={point}
          className="ui-flex ui-flex-row ui-items-center ui-gap-2"
        >
          <div className="md:ui-w-10 md:ui-h-9 ui-w-6 ui-h-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 41 36"
            >
              <path
                fill="#AEAEB2"
                fillRule="evenodd"
                d="M15.03 9c5.65.17 10.42 4.04 12.2 9.53 1.8 5.56.48 11.9-4.17 15.33-4.62 3.4-10.77 2.47-15.45-.86-5-3.57-9-9.32-7.15-15.26C2.33 11.67 8.8 8.82 15.03 9Z"
                clipRule="evenodd"
              />
              <path
                fill="#090A0B"
                d="M40.8 6.2c.26.26.26.68 0 .94L18.15 29.81a.68.68 0 0 1-.95 0l-12-12a.68.68 0 0 1 0-.95.67.67 0 0 1 .95 0L17.6 28.39 39.86 6.2a.68.68 0 0 1 .95 0Z"
              />
            </svg>
          </div>
          <p className="ui-text-body2 ui-text-label-light-secondary">{point}</p>
        </div>
      ))}
    </div>
  );
};
