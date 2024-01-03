import React from "react";
import { StoryFn } from "@storybook/react";
import Prefecture, { PrefectureProps } from "../components/Prefecture";

export default {
  title: "Components/Prefecture",
  component: Prefecture,
};

const Template: StoryFn<PrefectureProps> = (args) => <Prefecture {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "北海道",
  value: "1",
};
