import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';
import OnboardingLayout from '../../../components/_layouts/Onboarding';
import InfoSection from '../../../components/onboarding-page/InfoSection';
import VideoSection from '../../../components/onboarding-page/VideoSection';
import FAQ from '../../../components/onboarding-page/FAQ';
import SiteMetadata from '../../../components/SiteMetadata';
import './style.scss';

const Onboarding = () => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const [shouldShowLessonList, setShouldShowLessonList] = useState(false);
  const [shouldReloadRole, setShouldReloadRole] = useState(false);
  const [shouldShowGetStarted, setShouldShowGetStarted] = useState(false);
  const lessonIndex = 1;

  const questions = [
    {
      title: t('onboarding.page1.faq.questions.language.question'),
      text: t('onboarding.page1.faq.questions.language.answer'),
    },
    {
      title: t('onboarding.page1.faq.questions.polkadot.question'),
      text: t('onboarding.page1.faq.questions.polkadot.answer'),
    }
  ];

  return (
    <OnboardingLayout
      t={t}
      showLessonList={shouldShowLessonList}
      shouldShowGetStarted={shouldShowGetStarted}
      lessonIndex={lessonIndex}
      onGetStartedClose={() => setShouldShowGetStarted(false)}
      onLessonListClose={() => setShouldShowLessonList(false)}
      onRoleUpdated={() => setShouldReloadRole(true)}
      onIsLastPage={() => {}}
    >
      <SiteMetadata lang={language} title={t('onboarding.page1.title')} description={t('onboarding.page1.subtitle')} />
      <div className="Onboarding__wrapper">
        <VideoSection
          t={t}
          title={t('onboarding.page1.title')}
          subtitle={t('onboarding.page1.subtitle')}
          index={lessonIndex}
          shouldReloadRole={shouldReloadRole}
          onShowGetStarted={() => setShouldShowGetStarted(true)}
          onRoleReloaded={() => setShouldReloadRole(false)}
          showLessonList={() => setShouldShowLessonList(true)}
        ></VideoSection>
      </div>
      <InfoSection title={t('onboarding.page1.infoSection.title')} text={t('onboarding.page1.infoSection.text')} />
      <FAQ title={t('onboarding.page1.faq.title')} tokenQuestions={questions} />
    </OnboardingLayout>
  );
};

export default Onboarding;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      ...LanguageQueryFields
    }
  }
`;
