import React from 'react';
import { graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import OnboardingLayout from '../../components/_layouts/Onboarding';
import InfoSection from '../../components/onboarding-page/InfoSection';
import VideoSection from '../../components/onboarding-page/VideoSection';
import TokenInformation from '../../components/token-page/TokenInformation';

import './style.scss';

const videoUrl = 'https://new.xjames.xyz/storage/asset/v0/5DGJcMrKSPUCDjPWXjuHTSHUxs29yAV2NUMdkxNJ6yP496PD';

const Onboarding = () => {
  const { t } = useTranslation();

  const questions = [
    {
      title: t('onboarding.page1.faq.questions.language.question'),
      text: t('onboarding.page1.faq.questions.language.answer'),
    },
    {
      title: t('onboarding.page1.faq.questions.polkadot.question'),
      text: t('onboarding.page1.faq.questions.polkadot.answer'),
    },
    {
      title: t('onboarding.page1.faq.questions.framework.question'),
      text: t('onboarding.page1.faq.questions.framework.answer'),
    },
  ];

  return (
    <OnboardingLayout t={t}>
      <div className="Onboarding__wrapper">
        <VideoSection
          t={t}
          title={t('onboarding.page1.title')}
          subtitle={t('onboarding.page1.subtitle')}
          videoUrl={videoUrl}
          index={1}
        ></VideoSection>
      </div>
      <InfoSection title={t('onboarding.page1.infoSection.title')} text={t('onboarding.page1.infoSection.text')} />
      <TokenInformation title={t('onboarding.page1.faq.title')} tokenQuestions={questions} />
    </OnboardingLayout>
  );
};

export default Onboarding;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
