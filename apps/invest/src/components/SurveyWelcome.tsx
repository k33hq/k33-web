import { Answers, Questions } from '@/config/classification';
import * as React from 'react';
import { BasicButton } from 'ui';

interface SurveyWelcomeProps {
  description: string;
  label: string;
  title?: string;
  onNext: () => void;
  icon: React.ReactNode;
}

const SurveyWelcome: React.FC<SurveyWelcomeProps> = ({
  description,
  label,
  title,
  icon,
  onNext,
}) => {
  // TODO: make it according to figma later
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center md:gap-12 gap-10">
        {title ? (
          <div className="flex md:flex-row flex-col items-center md:gap-4 gap-2">
            <div className="h-[64px] w-[64px]">{icon}</div>
            <h6 className="md:text-heading6 text-heading8">{title}</h6>
          </div>
        ) : (
          icon
        )}
        <p className="md:text-heading7 text-body1 text-label-light-secondary text-center">
          {description}
        </p>
        <div>
          <BasicButton onClick={onNext}>
            <div className="flex flex-row items-center gap-2">
              {label}
              <div>
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_135_407)">
                    <path
                      d="M9.9492 1.37985L16.2344 7.37934C16.404 7.54115 16.5 7.76538 16.5 8C16.5 8.23462 16.404 8.45853 16.2344 8.62066L9.9492 14.6202C9.60659 14.946 9.06427 14.9337 8.73716 14.5911C8.41019 14.2519 8.42247 13.7073 8.76617 13.3791L13.5051 8.85805H1.35743C0.884253 8.85805 0.5 8.4738 0.5 8.00062C0.5 7.52745 0.884253 7.14391 1.35743 7.14391H13.5028L8.76394 2.62287C8.42076 2.29405 8.41004 1.74946 8.73502 1.40913C9.06356 1.0663 9.57423 1.05416 9.9492 1.37985Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_135_407">
                      <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </BasicButton>
        </div>
      </div>
    </div>
  );
};

export default SurveyWelcome;
