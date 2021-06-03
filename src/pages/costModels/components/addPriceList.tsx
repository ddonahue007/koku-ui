import {
  ActionGroup,
  Button,
  ButtonVariant,
  Form,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
  Title,
} from '@patternfly/react-core';
import { MetricHash } from 'api/metrics';
import {
  canSubmit as isReadyForSubmit,
  RateForm,
  RateFormData,
  useRateData,
} from 'pages/costModels/components/rateForm';
import { CostModelContext } from 'pages/costModels/createCostModelWizard/context';
import React from 'react';
import { useIntl } from 'react-intl';
import messages from 'locales/messages';

interface AddPriceListProps {
  metricsHash: MetricHash;
  submitRate: (data: RateFormData) => void;
  cancel: () => void;
}

const AddPriceList: React.FunctionComponent<AddPriceListProps> = ({ submitRate, cancel, metricsHash }) => {
  const { tiers } = React.useContext(CostModelContext);
  const intl = useIntl();
  const rateFormData = useRateData(metricsHash, undefined, tiers);
  const canSubmit = React.useMemo(() => isReadyForSubmit(rateFormData), [rateFormData.errors, rateFormData.rateKind]);
  return (
    <Stack hasGutter>
      <StackItem>
        <Title headingLevel="h2" size="xl">
          {intl.formatMessage(messages.CostModelsCreateAPriceList)}
        </Title>
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component={TextVariants.h6}>{intl.formatMessage(messages.CostModelsSubTitleAdd)}</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <Form>
          <RateForm metricsHash={metricsHash} rateFormData={rateFormData} />
        </Form>
      </StackItem>
      <StackItem>
        <ActionGroup>
          <Button variant={ButtonVariant.primary} isDisabled={!canSubmit} onClick={() => submitRate(rateFormData)}>
            {intl.formatMessage(messages.CostModelsCreateRate)}
          </Button>
          <Button variant={ButtonVariant.link} onClick={cancel}>
            {intl.formatMessage(messages.Cancel)}
          </Button>
        </ActionGroup>
      </StackItem>
    </Stack>
  );
};

export default AddPriceList;
