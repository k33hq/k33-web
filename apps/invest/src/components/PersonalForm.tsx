import { useFundRegistrationMutation } from '@/services';
import { FundInfo, PersonalRegistration } from '@/types';
import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { BasicButton, Input } from 'ui';
import { Listbox, Transition } from '@headlessui/react';
import countryList from '../assets/countries.json';

interface PersonalFormProps {
  onPositive: () => void;
}

interface Country {
  isO2CountyCode: string;
  isO3CountyCode: string;
  displayName: string;
  callingCountryCode: number;
}

// TODO: extract the inputs in another components
const PersonalForm: React.FC<PersonalFormProps> = ({ onPositive }) => {
  const [country, setCountry] = React.useState<Country>(
    countryList[0] as Country
  );

  const [callCountry, setCallCountry] = React.useState<Country>(countryList[0]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<PersonalRegistration>({
    mode: 'onChange',
  });

  const [registerFund, { isLoading, isSuccess, data, error, isError }] =
    useFundRegistrationMutation();

  const handleRegistration = async (data: PersonalRegistration) => {
    const body: FundInfo = {
      investorType: 'PROFESSIONAL',
      name: data.name,
      phoneNumber: {
        nationalNumber: data.nationalNumber,
        countryCode: data.countryCode,
      },
      countryCode: data.country,
    };

    try {
      const payload = await registerFund({
        id: 'k33-assets-i-fund-limited',
        ...body,
        fundName: 'K33 Assets I Fund Limited',
      }).unwrap();
      onPositive();
    } catch (error) {
      console.error('rejected', error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleRegistration)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4 md:max-w-[592px]">
          <label htmlFor="name" className="text-heading8" aria-required>
            What is your name?
          </label>
          <input
            {...register('name', { required: true })}
            className="border-[1px] border-default-systemGrey-light-5 rounded px-2 py-2"
          />
        </div>
        <div className="flex flex-col gap-4 md:max-w-[592px]">
          <Controller
            control={control}
            defaultValue=""
            name="country"
            render={({ field: { onChange } }) => (
              <Listbox
                as="div"
                className="space-y-1"
                style={{
                  zIndex: 2,
                }}
                value={setCountry}
                onChange={(
                  e: React.Dispatch<React.SetStateAction<Country>>
                ) => {
                  const newCountry = countryList.find(
                    (country) => country.isO3CountyCode === e.toString()
                  );
                  onChange(newCountry?.isO3CountyCode);
                  setCountry(newCountry!);
                }}
              >
                {({ open }) => (
                  <>
                    <Listbox.Label className="text-heading8">
                      What is your country of residence?
                    </Listbox.Label>
                    <div className="relative pt-4">
                      <span className="inline-block w-full rounded shadow-sm">
                        <Listbox.Button className="cursor-default relative w-full rounded border border-default-systemGrey-light-5 bg-bg-light-primary pl-3 pr-10 py-2 text-left focus:border-default-systemGrey-light transition ease-in-out duration-150">
                          <span className="block truncate">
                            {country.displayName}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-label-light-secondary"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                      </span>

                      <Transition
                        show={open}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute mt-1 w-full rounded bg-bg-light-primary shadow-lg"
                      >
                        <Listbox.Options
                          static
                          className="max-h-60 rounded py-2 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                        >
                          {countryList.map((country) => (
                            <Listbox.Option
                              key={country.displayName}
                              value={country.isO3CountyCode}
                            >
                              {({ selected, active }) => (
                                <div
                                  className={`${
                                    active
                                      ? 'text-label-dark-primary bg-brand-light-tertiary'
                                      : 'text-label-light-primary'
                                  } cursor-default select-none relative py-2 pl-8 pr-4`}
                                >
                                  <span
                                    className={`${
                                      selected ? 'font-semibold' : 'font-normal'
                                    } block truncate`}
                                  >
                                    {country.displayName}
                                  </span>
                                  {selected && (
                                    <span
                                      className={`${
                                        active
                                          ? 'text-white'
                                          : 'text-label-light-tertiary'
                                      } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                    >
                                      <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </span>
                                  )}
                                </div>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            )}
          />
        </div>
        <div className="flex md:flex-row flex-col gap-6">
          <div className="flex flex-col">
            <Controller
              control={control}
              defaultValue=""
              name="countryCode"
              render={({ field: { onChange } }) => (
                <Listbox
                  as="div"
                  value={setCallCountry}
                  style={{
                    zIndex: 1,
                  }}
                  onChange={(
                    e: React.Dispatch<React.SetStateAction<Country>>
                  ) => {
                    const newCountry = countryList.find(
                      (country) => country.callingCountryCode === Number(e)
                    );
                    onChange(newCountry?.callingCountryCode);
                    setCallCountry(newCountry!);
                  }}
                >
                  {({ open }) => (
                    <>
                      <Listbox.Label className="text-heading8">
                        Country Code
                      </Listbox.Label>
                      <div className="relative pt-4">
                        <span className="inline-block w-full rounded shadow-sm">
                          <Listbox.Button className="cursor-default relative w-full rounded border border-default-systemGrey-light-5 bg-bg-light-primary pl-3 pr-10 py-2 text-left focus:border-default-systemGrey-light transition ease-in-out duration-150">
                            <span className="block truncate">
                              {callCountry.displayName +
                                ' ' +
                                `+ ${callCountry.callingCountryCode}`}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                              <svg
                                className="h-5 w-5 text-label-light-secondary"
                                viewBox="0 0 20 20"
                                fill="none"
                                stroke="currentColor"
                              >
                                <path
                                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </Listbox.Button>
                        </span>

                        <Transition
                          show={open}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          className="absolute mt-2 w-full rounded bg-bg-light-primary shadow-lg"
                        >
                          <Listbox.Options
                            static
                            className="max-h-60 rounded py-2 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                          >
                            {countryList.map((country) => (
                              <Listbox.Option
                                key={country.displayName}
                                value={country.callingCountryCode}
                              >
                                {({ selected, active }) => (
                                  <div
                                    className={`${
                                      active
                                        ? 'text-label-dark-primary bg-brand-light-tertiary'
                                        : 'text-label-light-primary'
                                    } cursor-default select-none relative py-2 pl-8 pr-4`}
                                  >
                                    <span
                                      className={`${
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal'
                                      } block truncate`}
                                    >
                                      {country.displayName +
                                        ' ' +
                                        `+ ${country.callingCountryCode}`}
                                    </span>
                                    {selected && (
                                      <span
                                        className={`${
                                          active
                                            ? 'text-white'
                                            : 'text-label-light-tertiary'
                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                      >
                                        <svg
                                          className="h-5 w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              )}
            />
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="nationalNumber" className="text-heading8">
              Phone Number
            </label>
            <input
              {...register('nationalNumber', {
                valueAsNumber: true,
              })}
              className="border-[1px] border-default-systemGrey-light-5 rounded px-2 py-2"
            />
            {errors['nationalNumber'] && (
              <p className="error-message">Invalid Phone Number</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-1 flex-col">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="own_initiative"
                {...register('own_initiative', {
                  required: true,
                })}
                className="
    relative peer shrink-0
    appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white
    mt-1
    checked:bg-blue-800 checked:border-0"
              />
              <label htmlFor="own_initiative">
                By ticking the following box you confirm that your request for
                fund information was made at your own initiative.
              </label>
              <svg
                className="
    absolute 
    w-4 h-4 mt-1
    hidden peer-checked:block
    pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            {errors['own_initiative'] && (
              <p
                className="error-message"
                style={{
                  color: 'red',
                }}
              >
                Please tick this box
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex  gap-2">
              <input
                type="checkbox"
                id="terms_and_condition"
                {...register('terms_and_condition', {
                  required: true,
                })}
                className="
    relative peer shrink-0
    appearance-none w-4 h-4 border-2 border-blue-500 rounded-sm bg-white
    mt-1
    checked:bg-blue-800 checked:border-0"
              />
              <label htmlFor="terms-and-condition">
                By ticking this box I/we confirm having read and understood the
                above notice; consent to be treated as an investor as defined by
                the selected box above; confirm that I/we are authorized to sign
                this document; and confirm having read and agreed to AKJ’s data
                protection notice:{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  href="https://www.akj.com/legal"
                >
                  https://www.akj.com/legal
                </a>{' '}
                .
              </label>
              <svg
                className="
    absolute 
    w-4 h-4 mt-1
    hidden peer-checked:block
    pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            {errors['terms_and_condition'] && (
              <p
                className="error-message"
                style={{
                  color: 'red',
                }}
              >
                Please tick this box
              </p>
            )}
          </div>
        </div>

        <div>
          <BasicButton variant="secondary" size="medium" type="submit">
            {isLoading ? 'Registering' : 'Submit'}
          </BasicButton>
        </div>
      </form>
    </div>
  );
};

export default PersonalForm;
