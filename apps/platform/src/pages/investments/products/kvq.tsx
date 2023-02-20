import { BasicButton, NextPageWithLayout } from 'ui';
import Image from 'next/image';
import left from '../../../assets/kvq-left-bg.png';
import right from '../../../assets/kvq-right-bg.png';
import anders from '../../../assets/Anders.png';
import ceo from '../../../assets/Torbjorn.png';
import { FiExternalLink } from 'react-icons/fi';
import { MdOutlineSaveAlt } from 'react-icons/md';
import chart from '../../../assets/k33-vinter-quality-index-selection.svg';
import TempLayout from '@/layouts/TempLayout';

const KvQ: NextPageWithLayout = () => {
  return (
    <>
      <div
        className="relative w-full md:max-w-[1728px] px-6 md:px-0 mx-auto py-8 flex flex-col items-center content-center"
        id="markets-hero"
      >
        <div className="md:absolute md:left-0 md:h-[434px] md:w-[238px] hidden md:block">
          <Image
            src={left}
            fill
            style={{
              objectFit: 'contain',
            }}
            alt="left-market-bg"
          />
        </div>
        <div className="md:absolute md:right-0 md:h-[434px] md:w-[238px] hidden md:block">
          <Image
            src={right}
            fill
            style={{
              objectFit: 'contain',
            }}
            alt="left-market-bg"
          />
        </div>
        <div
          id="hero-text"
          className="flex flex-col md:justify-center items-center content-center md:text-center gap-4 md:pt-[164px]"
        >
          <h2 className="md:text-heading2 text-heading5 text-brand-light-primary">
            K33-Vinter Quality Index (KVQ)
          </h2>
        </div>
      </div>
      <div className="md:container flex flex-col gap-6 md:flex-row md:pt-[182px] px-6 md:px-0">
        <div className="flex md:flex-row flex-col md:w-[1104px]">
          <div id="kvq-data" className="flex flex-col md:gap-6">
            <p className="text-heading6 text-label-light-primary">
              What KVQ is?
            </p>
            <p className="md:text-heading7 text-label-light-secondary">
              The K33-Vinter index is a smart beta index for crypto assets. The
              index consists of an equal weighted mix of the most promising
              tokens amongst top 30 crypto assets. Tokens with a low long term
              survival-probability are excluded, contributing to a substantial
              reduction in downside risk in the index.
            </p>
            <p className="md:text-heading7 text-label-light-secondary">
              For inclusion in the index, a top 30 token must pass the Quality
              Filter. The purpose of the Quality Filter is to evaluate the
              quality of crypto assets from an investor’s standpoint. A
              high-quality asset is defined as an asset having a small
              probability of permanent financial loss while a low-quality asset
              possess a large probability of permanent financial loss.
            </p>
          </div>
        </div>
        <div id="kvq-contact" className="flex flex-col md:gap-6 md:pt-16">
          <p className="text-heading8">Contact</p>
          <div className="flex flex-col md:gap-6">
            <div
              id={`anders-profile`}
              className="flex flex-row items-center gap-2"
            >
              <div
                className="flex h-[88px] w-[88px]"
                style={{
                  position: 'relative',
                }}
              >
                <Image
                  src={anders}
                  alt={'vice president'}
                  fill
                  style={{
                    objectFit: 'cover',
                    borderRadius: '100px',
                  }}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-heading8 text-label-light-primary">
                  Anders Helseth
                </p>
                <p className="text-body1 text-label-light-secondary">
                  VP of Research
                </p>
                <a
                  href="mailto:anders@k33.com"
                  className="text-body2 text-label-light-secondary"
                >
                  anders@k33.com
                </a>
              </div>
            </div>
            <div
              id={'anders-profile'}
              className="flex flex-row items-center gap-2"
            >
              <div
                className="flex h-[88px] w-[88px]"
                style={{
                  position: 'relative',
                }}
              >
                <Image
                  src={ceo}
                  alt={'ceo'}
                  fill
                  style={{
                    objectFit: 'cover',
                    borderRadius: '100px',
                  }}
                />
              </div>
              <div className="flex flex-col">
                <p className="text-heading8 text-label-light-primary">
                  Torbjørn Bull Jenssen
                </p>
                <p className="text-body1 text-label-light-secondary">CEO</p>
                <a
                  href="mailto:tbj@k33.com"
                  className="text-body2 text-label-light-secondary"
                >
                  tbj@k33.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="links"
        className="md:container flex md:flex-row flex-col md:gap-8 md:py-12"
      >
        <a
          href="/invest/pdfs/PDF-report-Methodology.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <BasicButton size="medium">
            <div className="flex flex-row gap-2 items-center">
              Methodolody (PDF) <MdOutlineSaveAlt />
            </div>
          </BasicButton>
        </a>
        <a
          href="/invest/pdfs/PDF-report-Assessment-Jan-2023.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <BasicButton size="medium" variant="secondary">
            <div className="flex flex-row gap-2 items-center content-center">
              Latest Section Assessment (PDF) <MdOutlineSaveAlt />
            </div>
          </BasicButton>
        </a>
        <a
          href="https://vinter.co/k33"
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <BasicButton size="medium" variant="secondary">
            <div className="flex flex-row items-center gap-2">
              Go To Vinter <FiExternalLink />
            </div>
          </BasicButton>
        </a>
      </div>
      <div id="chart-section" className="md:container">
        <div className="flex md:flex-row flex-col md:justify-between items-center text-body2 text-label-light-primary md:py-10">
          <p>Last selection and rebalancing date : February 1st 2023</p>
          <p>Next selection and rebalancing date : May 1st 2023</p>
        </div>
        <div id="chart" className="flex flex-col items-center md:gap-10">
          <p className="text-heading7 text-label-light-primary">
            Current selection (Number indicates ranking by market cap on January
            25th, 2023)
          </p>
          <div className="relative w-full h-[992px]">
            <Image fill src={chart} alt="k33-vinter-chart" />
          </div>
        </div>
      </div>
    </>
  );
};

KvQ.getLayout = function getLayout(page: React.ReactElement) {
  return <TempLayout>{page}</TempLayout>;
};

export default KvQ;
