import React from 'react';

interface CurrencyDropdownProps {
  currency: string;
  setCurrency: (currency: string) => void;
  className?: string;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  currency,
  setCurrency,
  className,
}) => {
  return (
    <div className={'self-end my-4'}>
      <label className={className}>Fiat currency</label>
      <select
        name={'currencies'}
        id={'currencies'}
        onChange={(event) => setCurrency(event.target.value)}
        value={currency}
        className={'px-4 py-3 self-end border rounded-lg font-mono'}
      >
        <option value={'USD'}> 🇺🇸 USD</option>
        <option value={'NOK'}> 🇳🇴 NOK</option>
        <option value={'EUR'}> 💶 EUR</option>
        <option value={'GBP'}> 💷 GBP</option>
        <option value={'SEK'}> 🇸🇪 SEK</option>
        <option value={'DKK'}> 🇩🇰 DKK</option>
        <option value={'CHF'}> 🇨🇭 CHF</option>
      </select>
    </div>
  );
};

export default CurrencyDropdown;
