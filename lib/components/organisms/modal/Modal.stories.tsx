import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button, Typography } from "../../atoms";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    open: {
      control: "boolean",
      description: "Controls visibility of the modal",
    },
    onClose: { action: "closed" },
    modalTitle: {
      control: "text",
      description: "Modal window title",
    },
    className: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const WithButton: Story = {
  args: {
    open: true,
    modalTitle: "Email sent",
    onClose: () => {},
    children: (
      <div>
        <Typography variant="regular_16" color="light">
          We have sent a link to confirm your email to <b>epam@epam.com</b>.
        </Typography>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <Button>OK</Button>
        </div>
      </div>
    ),
  },
};

export const Default: Story = {
  args: {
    open: true,
    modalTitle: "Email sent",
    onClose: () => {},
    children: (
      <div>
        <Typography variant="regular_16" color="light">
          We have sent a link to confirm your email to <b>epam@epam.com</b>.
        </Typography>
      </div>
    ),
  },
};