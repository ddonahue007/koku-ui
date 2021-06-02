import { Button, ButtonVariant, FormGroup, Grid, GridItem, Radio, Switch } from '@patternfly/react-core';
import { PlusCircleIcon } from '@patternfly/react-icons/dist/js/icons/plus-circle-icon';
import { MetricHash } from 'api/metrics';
import messages from 'locales/messages';
import { RateInputBase } from 'pages/costModels/components/inputs/rateInput';
import { Selector } from 'pages/costModels/components/inputs/selector';
import { SimpleInput } from 'pages/costModels/components/inputs/simpleInput';
import React from 'react';
import { useIntl } from 'react-intl';

import { TaggingRatesForm } from './taggingRatesForm';
import { UseRateData } from './useRateForm';

interface RateFormProps {
  rateFormData: UseRateData;
  metricsHash: MetricHash;
}

export const RateForm: React.FunctionComponent<RateFormProps> = ({ metricsHash, rateFormData }) => {
  const intl = useIntl();
  const {
    step,
    description,
    metric,
    measurement: { value: measurement, isDirty: measurementDirty },
    calculation,
    rateKind,
    taggingRates: {
      tagKey: { value: tagKey, isDirty: isTagKeyDirty },
      defaultTag,
      tagValues,
    },
    tieredRates: {
      0: { value: regular, isDirty: regularDirty },
    },
    setDescription,
    setMetric,
    setMeasurement,
    setCalculation,
    setRegular,
    toggleTaggingRate,
    setTagKey,
    updateTag,
    updateDefaultTag,
    removeTag,
    addTag,
    errors,
  } = rateFormData;
  const metricOptions = React.useMemo(() => {
    return Object.keys(metricsHash);
  }, [metricsHash]);
  const measurementOptions = React.useMemo(() => {
    if (!metricOptions.includes(metric)) {
      return [];
    }
    return Object.keys(metricsHash[metric]);
  }, [metricOptions, metric]);
  const style = { width: '360px' };
  const addStyle = {
    paddingLeft: '0',
    textAlign: 'left',
  } as React.CSSProperties;
  return (
    <>
      <SimpleInput
        style={style}
        id="description"
        label={intl.formatMessage(messages.Description)}
        value={description}
        validated={errors.description ? 'error' : 'default'}
        helperTextInvalid={errors.description}
        onChange={setDescription}
      />
      <Grid hasGutter>
        <GridItem span={6}>
          <Selector
            isRequired
            style={style}
            id="metric"
            label={intl.formatMessage(messages.Metric)}
            value={metric}
            onChange={setMetric}
            options={[
              {
                label: `${intl.formatMessage(messages.CostModelsDefaultOption)}`,
                value: '',
                isDisabled: true,
              },
              ...metricOptions.map(opt => {
                return {
                  label: opt,
                  value: opt,
                  isDisabled: false,
                };
              }),
            ]}
          />
        </GridItem>
        {step === 'initial' ? null : (
          <GridItem span={6}>
            <Selector
              isRequired
              helperTextInvalid={errors.measurement}
              isInvalid={errors.measurement && measurementDirty}
              style={style}
              id="measurement"
              label={intl.formatMessage(messages.Measurement)}
              value={measurement}
              onChange={setMeasurement}
              options={[
                {
                  label: `${intl.formatMessage(messages.CostModelsDefaultOption)}`,
                  value: '',
                  isDisabled: true,
                },
                ...measurementOptions.map(opt => {
                  return {
                    label: `${opt} (${metricsHash[metric][opt].label_measurement_unit})`,
                    value: opt,
                    isDisabled: false,
                  };
                }),
              ]}
            />
          </GridItem>
        )}
      </Grid>
      {step === 'set_rate' ? (
        <>
          <>
            <FormGroup
              isInline
              style={style}
              fieldId="calculation"
              label={intl.formatMessage(messages.CalculationType)}
            >
              <Radio
                name="calculation"
                id="calculation_infra"
                label={intl.formatMessage(messages.Infrastructure)}
                isChecked={calculation === 'Infrastructure'}
                onChange={() => setCalculation('Infrastructure')}
              />
              <Radio
                name="calculation"
                id="calculation_suppl"
                label={intl.formatMessage(messages.Supplementary)}
                isChecked={calculation === 'Supplementary'}
                onChange={() => setCalculation('Supplementary')}
              />
            </FormGroup>
            {metric !== 'Cluster' ? (
              <Switch
                aria-label={intl.formatMessage(messages.CostModelsEnterRateByTag)}
                label={intl.formatMessage(messages.CostModelsEnterRateByTag)}
                isChecked={rateKind === 'tagging'}
                onChange={toggleTaggingRate}
              />
            ) : null}
          </>
          {rateKind === 'regular' ? (
            <RateInputBase
              style={style}
              helperTextInvalid={errors.tieredRates}
              validated={errors.tieredRates && regularDirty ? 'error' : 'default'}
              value={regular}
              onChange={setRegular}
              fieldId="regular-rate"
            />
          ) : (
            <>
              <SimpleInput
                isRequired
                style={style}
                value={tagKey}
                onChange={setTagKey}
                id="tag-key"
                label={intl.formatMessage(messages.CostModelsFilterBTagKey)}
                placeholder={intl.formatMessage(messages.CostModelsEnterTagKey)}
                validated={errors.tagKey && isTagKeyDirty ? 'error' : 'default'}
                helperTextInvalid={errors.tagKey}
              />
              <TaggingRatesForm
                errors={{
                  tagValues: errors.tagValues,
                  tagValueValues: errors.tagValueValues,
                  tagDescription: errors.tagDescription,
                }}
                updateDefaultTag={updateDefaultTag}
                defaultTag={defaultTag}
                tagValues={tagValues}
                updateTag={updateTag}
                removeTag={removeTag}
              />
              <Button data-testid="add_more" style={addStyle} variant={ButtonVariant.link} onClick={addTag}>
                <PlusCircleIcon /> {intl.formatMessage(messages.CostModelsAddMoreTagValues)}
              </Button>
            </>
          )}
        </>
      ) : null}
    </>
  );
};
