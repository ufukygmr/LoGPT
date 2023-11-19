import { IInputProps, Input } from "native-base";
import { colors } from "../lib/colors";

export interface AppInputProps extends IInputProps {
  invalid?: boolean;
}

export function AppInput({ invalid, ...props }: AppInputProps) {
  return (
    <Input
      borderColor={invalid && colors.border.error}
      {...props}
      autoCorrect={false}
    />
  );
}
