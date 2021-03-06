import { EmptyState, EmptyStateBody, EmptyStateVariant, Spinner, Title } from '@patternfly/react-core';
import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';

interface LoadingStateProps extends WithTranslation {
  icon?: string;
}

const LoadingStateBase: React.SFC<LoadingStateProps> = ({ t }) => {
  const title = t('loading_state.sources_title');
  const subTitle = t('loading_state.sources_desc');

  return (
    <EmptyState variant={EmptyStateVariant.large} className="pf-m-redhat-font">
      <Spinner size="lg" />
      <Title headingLevel="h5" size="lg">
        {title}
      </Title>
      <EmptyStateBody>{subTitle}</EmptyStateBody>
    </EmptyState>
  );
};

const LoadingState = withTranslation()(LoadingStateBase);

export { LoadingState };
