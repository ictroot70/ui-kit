import type {Meta, StoryObj} from "@storybook/react";
import { Select } from "./Select";
import { RussiaFlag } from '../../../assets/icons'
import UkFlag from '../../../assets/icons/components/UkFlag'


const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: { type: "object" },
    },
    disabled: { control: "boolean" },
  },
  args: {
    defaultValue: "React",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const SelectLanguages: Story = {
  args: {
    label: "Select-box",
    items: [
      { value: "HTML", label: "HTML" },
      { value: "CSS", label: "CSS" },
      { value: "React", label: "React" },
      { value: "Redux", label: "Redux" },
      { value: "TypeScript", label: "TypeScript" },
    ],
    disabled: false,
  },
};

export const SelectDisabled: Story = {
  args: {
    label: "select skills",
    items: [
      { value: "HTML", label: "HTML" },
      { value: "CSS", label: "CSS" },
      { value: "React", label: "React" },
      { value: "Redux", label: "Redux" },
      { value: "TypeScript", label: "TypeScript" },
    ],
    disabled: true,
  },
};


export const SelectWithFlag: Story = {
  args: {
    label: "Выберите язык",
    defaultValue: "ru",
    items: [
      { value: "ru", label: "Русский", icon: <RussiaFlag /> },
      { value: "en", label: "Английский", icon: <UkFlag /> },
    ],
    disabled: false,
  },
};


export const SelectMedium: Story = {
  args: {
    defaultValue: "100",
    width: "50px",
    height: "24px",
    padding: "6px 4px",
    fontSize: "14px",
    itemFontSize: "14px",
    dropdownWidth: "50px",
    itemPadding: "6px 6px",
    arrowSize: "16px",
    items: [
      { value: "10", label: "10" },
      { value: "20", label: "20" },
      { value: "30", label: "30" },
      { value: "50", label: "50" },
      { value: "100", label: "100" },
    ],
    disabled: false,
  },
};