import { useState, forwardRef, ElementRef } from 'react';
import styles from './SelectLanguage.module.scss';
import {ArrowDownSimple, UkFlag} from '../../../assets/icons';
import {Typography} from "../Typography";

export interface SelectLanguageOption {
    value: string;
    label: string;
}

interface SelectLanguageProps {
    options: SelectLanguageOption[];
    onChange?: (value: string) => void;
    defaultValue?: string;
}

export const SelectLanguage = forwardRef<ElementRef<'div'>, SelectLanguageProps>(
    ({ options, onChange, defaultValue }, ref) => {
        const defaultSelected = options.find(opt => opt.value === defaultValue) || options[0];
        const [isOpen, setIsOpen] = useState(false);
        const [selected, setSelected] = useState<SelectLanguageOption>(defaultSelected);

        const toggleOpen = () => setIsOpen(prev => !prev);
        const handleSelect = (option: SelectLanguageOption) => {
            setSelected(option);
            setIsOpen(false);
            onChange?.(option.value);
        };

        return (
            <div ref={ref} className={styles.wrapper}>
                <div className={styles.selected} onClick={toggleOpen}>
                    <div className={styles.wrap}>
                        <UkFlag/>
                        <Typography variant={'regular_16'}>{selected.label}</Typography>
                    </div>
                    <ArrowDownSimple/>
                </div>

                {isOpen && (
                    <ul className={styles.dropdown}>
                        {options.map(option => (
                            <li
                                key={option.value}
                                className={styles.option}
                                onClick={() => handleSelect(option)}
                            >
                                <UkFlag/>
                                <Typography variant={'regular_16'}>{option.label}</Typography>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
);

SelectLanguage.displayName = 'SelectLanguage';
