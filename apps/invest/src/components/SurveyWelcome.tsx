import { Answers, Questions } from '@/config/classification';
import * as React from 'react';
import { BasicButton } from 'ui';

interface SurveyWelcomeProps {
  description: string;
  label: string;
  title: string;
  onNext: () => void;
}

const SurveyWelcome: React.FC<SurveyWelcomeProps> = ({
  description,
  label,
  title,
  onNext,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center md:gap-12">
        <div className="flex flex-row items-center md:gap-4">
          <svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="72" height="72" rx="16" fill="#090A0B" />
            <path
              d="M39.75 18.5C40.4375 18.5 41 19.0594 41 19.75V23.5C42.3828 23.5 43.5 24.6172 43.5 26V33.5C43.5 34.8828 42.3828 36 41 36V39.75C41 40.4375 40.4375 41 39.75 41C39.0625 41 38.5 40.4375 38.5 39.75V36C37.1172 36 36 34.8828 36 33.5V26C36 24.6172 37.1172 23.5 38.5 23.5V19.75C38.5 19.0594 39.0625 18.5 39.75 18.5ZM48.5 27.25C48.5 26.5625 49.0625 26 49.75 26C50.4375 26 51 26.5625 51 27.25V31C52.3828 31 53.5 32.1172 53.5 33.5V38.5C53.5 39.8828 52.3828 41 51 41V44.75C51 45.4375 50.4375 46 49.75 46C49.0625 46 48.5 45.4375 48.5 44.75V41C47.1172 41 46 39.8828 46 38.5V33.5C46 32.1172 47.1172 31 48.5 31V27.25ZM26 28.5C26 27.1172 27.1172 26 28.5 26V22.25C28.5 21.5594 29.0625 21 29.75 21C30.4375 21 31 21.5594 31 22.25V26C32.3828 26 33.5 27.1172 33.5 28.5V38.5C33.5 39.8828 32.3828 41 31 41V44.75C31 45.4375 30.4375 46 29.75 46C29.0625 46 28.5 45.4375 28.5 44.75V41C27.1172 41 26 39.8828 26 38.5V28.5Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M18.5 18.5C19.8805 18.5 21 19.6195 21 21V47.25C21 47.9375 21.5594 48.5 22.25 48.5H53.5C54.8828 48.5 56 49.6172 56 51C56 52.3828 54.8828 53.5 53.5 53.5H22.25C18.7984 53.5 16 50.7031 16 47.25V21C16 19.6195 17.1195 18.5 18.5 18.5Z"
              fill="white"
            />
          </svg>
          <h6 className="md:text-heading6">{title}</h6>
        </div>
        <p className="text-heading7 text-label-light-secondary text-center">
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
