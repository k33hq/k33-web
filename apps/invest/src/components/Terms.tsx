import * as React from 'react';
import SurveyButton from './SurveyButton';

interface TermsProps {
  onPositive: () => void;
}

const termsConditions = [
  'IMPORTANT: YOU SHOULD ESTABLISH WHETHER YOU POSSESSES SUFFICIENT EXPERIENCE, KNOWLEDGE AND EXPERTISE TO ENABLE YOURSELF TO MAKE YOUR OWN INVESTMENT DECISIONS AND PROPERLY ASSESS THE RISKS THAT SUCH INVESTMENT INCURS. IF YOU ARE IN ANY DOUBT, WE ADVISE YOU TO CONSULT YOUR STOCKBROKER, FINANCIAL ADVISER, BANK MANAGER OR EQUIVALENT.',
  'Understanding By requesting to be treated as an Elective Professional, you understand that you will lose the protections applicable exclusively to retail clients outlined in COBS of the FCA rules handbook.',
  'The Investment Manager will not be obliged to warn you of the nature of any risks involved in any potential investments in the fund. The key risks of investing in the fund are set out in the Offering Memorandum of the fund. ',
  "The Investment Manager will not be obliged to disclose the basis or amount of its charges for any services the Investment Manager provides to you or on your behalf or the amount of any other income that the Investment Manager may receive from third parties in connection with such services. The basis and amount of the Investment Manager's charges are set out in section 8 of the Offering Supplement of the fund.",
  'The Investment Manager will not be obliged to set out any of the prescribed contents, disclosures or risk warnings needed for retail customers in offering documents, marketing brochures and other non real time financial promotions material, nor will the Investment Manager be subject to the restrictions that apply to a retail client in relation to unsolicited real time communications to investors.',
  'The Investment Manager will not be required to give you the warnings required for retail clients in relation to material which may lead you to deal with or use overseas firms which are not regulated by the Financial Services and Markets Act 2000 nor will the Investment Manager have to satisfy itself that the overseas firm will deal with you in an honest and reliable way. The Investment Manager will also not be required to comply with the FCA rules relating to restrictions on and the content of direct offer advertisements. ',
  'The majority of the FCA rules in relation to the form and content of financial promotions will not be applicable in respect of any financial promotion communicated or approved by the Investment Manager.',
  "The relevant COBS rules do not require the Investment Manager to send periodic statements in the form and timeframes required, or submit to more frequent requests for such information, as specified under COBS 16.3. With regards to best execution, the specific requirements layed out in COBS 11.2.7 [Role of price] and COBS 11.2.10 [Competing executing venues] in respect of the Investment Manager's obligation to provide best execution will not apply. Appropriateness: In relation to the requirements of COBS 10, we will assume that the investor has the necessary experience and knowledge in order to understand the risks involved in relation to those particular investment services or transactions, or types of transaction or product, for which you have been classified as an Elective Professional Client.",
  " Complaint Handling: As an Elective Professional, the investor may not be an 'Eligible complainant' and may lose the right of access to the Financial Ombudsman Service. Any complaint you make will be dealt with under our internal complaints procedures.",
];

const Terms: React.FC<TermsProps> = ({ onPositive }) => {
  return (
    <div className="flex flex-col gap-10">
      <div
        id="Terms and Conditions"
        className="flex flex-col items-center gap-1"
      >
        <h5 className="text-heading8 text-label-light-primary">
          Terms & Conditions
        </h5>
        <p className="text-body2 text-brand-light-secondary">
          Take a look in our formal agreements
        </p>
      </div>
      <div className="h-[382px] overflow-y-auto scroll-m-1 stroke-bg-dark-secondary">
        {termsConditions.map((v) => (
          <p key={v}>{v}</p>
        ))}
      </div>
      <div>
        <SurveyButton
          label="I read and agree with K33 Terms and Conditions."
          letter="A"
          onClick={onPositive}
        />
      </div>
    </div>
  );
};

export default Terms;
