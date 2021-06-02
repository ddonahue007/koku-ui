import { Button, ButtonVariant, Checkbox, FormGroup, Split, SplitItem } from '@patternfly/react-core';
import { MinusCircleIcon } from '@patternfly/react-icons/dist/js/icons/minus-circle-icon';
import messages from 'locales/messages';
import { RateInputBase } from 'pages/costModels/components/inputs/rateInput';
import { SimpleInput } from 'pages/costModels/components/inputs/simpleInput';
import React from 'react';
import { useIntl } from 'react-intl';

import { UseRateData } from './useRateForm';
import { RateFormErrors, RateFormTagValue } from './utils';

interface TaggingRatesFormProps {
  tagValues: RateFormTagValue[];
  updateDefaultTag: UseRateData['updateDefaultTag'];
  defaultTag: UseRateData['taggingRates']['defaultTag'];
  updateTag: UseRateData['updateTag'];
  removeTag: UseRateData['removeTag'];
  errors: Pick<RateFormErrors, 'tagValueValues' | 'tagValues' | 'tagDescription'>;
}

export const TaggingRatesForm: React.FunctionComponent<TaggingRatesFormProps> = ({
  tagValues,
  updateDefaultTag,
  defaultTag,
  updateTag,
  removeTag,
  errors,
}) => {
  const intl = useIntl();
  const style = { width: '200px' };
  const elementStyle = {
    height: '100%',
    position: 'relative',
    top: '50%',
  } as React.CSSProperties;
  return (
    <>
      {tagValues.map((tag, ix: number) => {
        return (
          <Split hasGutter key={ix}>
            <SplitItem style={elementStyle}>=</SplitItem>
            <SplitItem>
              <SimpleInput
                isRequired
                style={style}
                id={`tagValue_${ix}`}
                label={intl.formatMessage(messages.TagValue)}
                placeholder={intl.formatMessage(messages.CostModelsEnterTagValue)}
                value={tag.tagValue}
                onChange={value => updateTag({ tagValue: value }, ix)}
                validated={tagValues[ix].isTagValueDirty && errors.tagValueValues[ix] ? 'error' : 'default'}
                helperTextInvalid={errors.tagValueValues[ix]}
              />
            </SplitItem>
            <SplitItem>
              <RateInputBase
                style={style}
                fieldId={`rate_${ix}`}
                validated={tagValues[ix].isDirty && errors.tagValues[ix] ? 'error' : 'default'}
                value={tag.value}
                onChange={value => updateTag({ value }, ix)}
                helperTextInvalid={errors.tagValues[ix]}
              />
            </SplitItem>
            <SplitItem>
              <SimpleInput
                style={style}
                id={`desc_${ix}`}
                label={intl.formatMessage(messages.Description)}
                validated={errors.tagDescription[ix] ? 'error' : 'default'}
                value={tag.description}
                onChange={value => updateTag({ description: value }, ix)}
                helperTextInvalid={errors.tagDescription[ix]}
              />
            </SplitItem>
            <SplitItem>
              <FormGroup fieldId={`isDefault_${ix}`} label={intl.formatMessage(messages.Default)}>
                <Checkbox id={`isDefault_${ix}`} isChecked={defaultTag === ix} onChange={() => updateDefaultTag(ix)} />
              </FormGroup>
            </SplitItem>
            <SplitItem>
              <FormGroup fieldId="__irrelevant" label={<div>&nbsp;</div>}>
                <Button
                  data-testid={`remove_tag_${ix}`}
                  variant={ButtonVariant.plain}
                  isDisabled={tagValues.length === 1}
                  onClick={() => removeTag(ix)}
                >
                  <MinusCircleIcon />
                </Button>
              </FormGroup>
            </SplitItem>
          </Split>
        );
      })}
    </>
  );
};
