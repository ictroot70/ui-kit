import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { Typography } from 'components/atoms/Typography';
import styles from '../Pagination.module.scss';

interface PaginationItemsPerPageProps {
  itemsPerPage: number;
  options: number[];
  onChange: (value: number) => void;
}

export const PaginationItemsPerPage = ({
  itemsPerPage,
  options,
  onChange,
}: PaginationItemsPerPageProps) => {
  return (
    <div className={styles.itemsPerPageContainer}>
      <Typography variant="regular_14" className={styles.itemsPerPageLabel}>
        Show
      </Typography>

      <Select.Root value={itemsPerPage.toString()} onValueChange={(v) => onChange(Number(v))}>
        <Select.Trigger className={styles.selectTrigger} aria-label="Items per page">
          <Select.Value />
          <Select.Icon className={styles.selectIcon}>
            <ChevronDownIcon className={styles.chevronIcon} data-state="closed" />
            <ChevronUpIcon className={styles.chevronIcon} data-state="open" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.selectContent} position="popper" sideOffset={4}>
            <Select.Viewport className={styles.selectViewport}>
              {options.map((count) => (
                <Select.Item
                  key={count}
                  value={count.toString()}
                  className={styles.selectItem}
                >
                  <Select.ItemText>
                    <Typography variant="regular_14" asChild>
                      <span>{count}</span>
                    </Typography>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <Typography variant="regular_14" className={styles.itemsPerPageLabel}>
        on page
      </Typography>
    </div>
  );
};