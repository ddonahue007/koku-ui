import { IRow, TableVariant } from '@patternfly/react-table';
import { TagRates } from 'api/rates';
import messages from 'locales/messages';
import { TableTemplate } from 'pages/costModels/components/tableTemplate';
import React from 'react';
import { useIntl } from 'react-intl';
import { formatCurrency } from 'utils/formatValue';

interface TagRateTableProps {
  tagRates: TagRates;
}

const cells = [
  messages.TagKey.defaultMessage,
  messages.TagValue.defaultMessage,
  messages.Rate.defaultMessage,
  messages.Description.defaultMessage,
  messages.Default.defaultMessage,
];

const translateRows = (rows: IRow[]): IRow[] => {
  return rows.map(row => {
    const rowCells = row.cells.map(cell => {
      if (typeof cell === 'string') {
        const intl = useIntl();
        return intl.formatMessage(messages.CustomMessage, { msg: cell });
      }
      return cell;
    });

    return {
      ...row,
      cells: rowCells,
    };
  });
};

const TagRateTable: React.FunctionComponent<TagRateTableProps> = ({ tagRates }) => {
  const rows = tagRates.tag_values.map((tagValue, ix) => {
    return {
      cells: [
        ix === 0 ? tagRates.tag_key : '',
        tagValue.tag_value,
        formatCurrency(tagValue.value),
        tagValue.description,
        tagValue.default ? 'cost_models.yes' : 'cost_models.no',
      ],
    };
  });
  const translatedRows = translateRows(rows);
  return (
    <TableTemplate
      aria-label={`tag-table-rate-${tagRates.tag_key}`}
      borders={false}
      variant={TableVariant.compact}
      cells={cells}
      rows={translatedRows}
    />
  );
};

export default TagRateTable;
