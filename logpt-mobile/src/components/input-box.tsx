import { Input } from "native-base";
import React from "react";
import { colors } from "../lib/colors";

export interface InputBoxProps {
  placeholder?: string;
  isPassword?: boolean;
}

export function InputBox({ placeholder, isPassword = false }: InputBoxProps) {
  return (
    <Input
      placeholder={placeholder}
      color={colors.text.primary}
      size={"md"}
      type={isPassword ? "password" : "text"}
    />
  );
}
