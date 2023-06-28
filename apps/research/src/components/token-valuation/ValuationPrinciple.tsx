import * as React from 'react';
import { Typography, theme } from 'antd';
import styles from './styles.module.scss';
import Image from 'next/image';
import formula from '../../assets/Quantity_theory_of_money.svg';
import chart from '../../assets/Fundamental_and_market_price_illustration.svg';

const { Title, Text } = Typography;
const { useToken } = theme;

const ValuationPrinciple: React.FC = () => {
  const {
    token: { fontSizeSM, colorTextLabel },
  } = useToken();
  return (
    <div id="valuation-principle" className={styles.valuationPrinciple}>
      <div id="valuation-header" className={styles.valuationHeader}>
        <div id="valuation-title" className={styles.valuationTitle}>
          <Title level={2} style={{ margin: 0 }}>
            A Framework for Evaluating Token Prices
          </Title>
          <Text type="secondary">
            The price of a token is determined by the equilibrium of demand and
            supply. For most tokens, the supply-side is known, and fluctuations
            in demand are the main price driver.
          </Text>
        </div>
        <Text
          type="secondary"
          style={{
            fontSize: fontSizeSM,
          }}
        >
          Note: To avoid confusion, think of demand as the combined willingness
          to hold or use a token at a given price, including the demand from
          current token holders.
        </Text>
      </div>
      <Text
        style={{
          color: colorTextLabel,
        }}
      >
        We further believe that demand can be decomposed into Fundamental and
        Speculative demand. Speculative demand is typically erratic,
        unpredictable, and impossible to quantify. Fundamental demand, on the
        other hand, is typically slower moving, more persistent, and
        quantifiable.
      </Text>
      <div
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        <Image
          priority
          src={chart}
          alt="company-logo"
          style={{
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
          }}
        />
      </div>
      <Text
        style={{
          color: colorTextLabel,
        }}
      >
        Long term, fundamental demand will dominate and can be understood as a
        trend or driver around which speculative demand fluctuates. Hence, as a
        long-term investor, it is key to have a good understanding of the
        fundamental value drivers of an asset. Having a clear understanding of
        the fundamentals will both expose the relative size and direction of
        speculative demand and form the basis for developing long-term
        investment hypotheses and scenarios. To provide investors with a toolset
        to do exactly this, we are developing a framework for assessing the
        fundamental value of a cryptocurrency token. The framework is a work in
        progress and can be severely altered as we learn more. Currently, we are
        conceptually dividing the fundamentals of a token price into three main
        components:
      </Text>
      <ul
        style={{
          color: colorTextLabel,
        }}
      >
        <li>
          <Text strong>Persistent Financial Premium -</Text> the store of value
          component
        </li>
        <li>
          <Text strong>Money Function -</Text> the medium of exchange component
        </li>
        <li>
          <Text strong>Access Utility -</Text> the use of a token to access
          utility
        </li>
      </ul>
      <div
        id="defining-the-three-components"
        className={styles.definingComponents}
        style={{
          color: colorTextLabel,
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,
            color: 'inherit',
          }}
        >
          Defining the three components of a fundamental token price:
        </Title>

        <div id="store-value">
          <Title
            style={{
              color: 'inherit',
            }}
            level={4}
          >
            1. The store of value component
          </Title>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            1.The best way to conceptually describe this category is by using
            physical gold as an example. Gold carries some intrinsic value due
            to its aesthetic appeal and scarce supply. Many things are, however,
            aesthetically appealing and scarce, without also having obtained the
            position as one of the prime global financial assets.
          </Text>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            Over time, and persistent throughout modern history, gold has been
            valued as more than an input into nice things. It has been used as
            an asset that maintains value across borders and time, despite
            political chaos. This property is not directly related to its
            intrinsic value, as an input into jewellery or other use cases.
            Hence, gold is persistently trading at a premium to its intrinsic
            value. This premium is the Store of Value component.
          </Text>
        </div>
        <div id="exchange-medium">
          <Title
            style={{
              color: 'inherit',
            }}
            level={4}
          >
            2. The medium of exchange function
          </Title>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            Money is a vital lubricant in the modern economy. To avoid
            inefficient bartering, money serves as a general means of exchange,
            or indirectly a much more efficient barter system. Instead of having
            to trade your labor directly for say a pig, you receive some
            attestation that you now have the possibility of buying a pig’s
            worth of goods or services.
          </Text>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            Throughout modern economic history, money has been issued by the
            state, and its value relies on trusting the state enough. For a long
            time, trust was upheld by a promise that money could be converted to
            gold at a given rate. After the gold standard was abolished over 50
            years ago, today’s money fully relies on trust in the monetary
            policy of the state. Money is complex and simple to evaluate at the
            same time. The velocity of money identity must hold true. How and
            why a certain velocity comes to fruition is though largely
            unexplained.
          </Text>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            Still, the simple takeaway here is clear. Using a token as a general
            means of exchange will drive value to, or show the value of, a
            token, and there are frameworks to think about what this should mean
            for token prices.
          </Text>
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Image
              priority
              src={formula}
              alt="money value"
              style={{
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
              }}
            />
          </div>
        </div>
        <div id="access-utility">
          <Title
            style={{
              color: 'inherit',
            }}
            level={4}
          >
            3. Access utility
          </Title>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            here, we are entering the landscape where more advanced blockchains
            should add value. Using bitcoin as an example, bitcoin’s value
            should lie almost solely in the two first components, store of value
            (1) and the money function (2). Ether, the native token of the more
            advanced Ethereum blockchain, can also hold value on 1 and 2, but
            the reason for its invention in the first place lies in the third
            component, use of Ether to access utility.
          </Text>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            Unlike 1 and 2, 3 can be clearly defined as an economic decision on
            the individual level. This allows for the development of models to
            predict how the use of a token to access utility will impact its
            value. While these models can provide valuable insights, it is
            important to note that the final token price will depend on the
            assumptions made about human behavior. Even so, we believe that the
            development of these models will allow for a more nuanced evaluation
            of token prices and how different scenarios may affect their value.
          </Text>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            Before rounding off, it’s worth mentioning that the three components
            are not necessarily fully independent of each other. Money is, for
            instance, a store of value, but most currencies do not have a
            financial premium in the sense we depict here. Still, you can argue
            that at least the US dollar has a persistent financial premium.
            Further, the financial premium might impact the use of a token as
            money and vice versa. The theoretical feedback loops can potentially
            be between all three categories here and is a topic we will revisit
            later.
          </Text>
          <Text
            style={{
              color: 'inherit',
            }}
          >
            After reading this article, you are not much closer to an applicable
            framework for evaluating token prices. But rest assured, we are
            working hard on modeling the price impact from use in the three
            categories. We will share more of this work later. Even though the
            framework will never be as easy and understandable as the Discounted
            Cash Flow (DCF) model of stocks, the framework will help structure
            thinking about token prices and highlight that some token prices are
            just completely bananas.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ValuationPrinciple;
