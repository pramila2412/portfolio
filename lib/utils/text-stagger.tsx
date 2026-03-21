import React from "react";

export interface StaggerTextOptions {
  staggerDelay?: number;
  by?: "word" | "line" | "char";
}

export function splitTextForAnimation(
  text: string,
  options: StaggerTextOptions = {}
): React.ReactNode[] {
  const { by = "word" } = options;

  switch (by) {
    case "word": {
      const words = text.split(" ");
      return words.map((word, index) => (
        <span
          key= { index }
          className = "inline-block will-animate"
          style = {{ whiteSpace: "pre" }}
        >
        { word }
      { index < words.length - 1 ? "\u00A0" : "" }
      </span>
      ));
  }
    case "line":
  return text.split("\n").map((line, index) => (
    <span key= { index } className = "block will-animate" >
    { line }
    </span>
  ));
    case "char":
  return text.split("").map((char, index) => (
    <span key= { index } className = "inline-block will-animate" >
      { char === " " ? "\u00A0" : char}
</span>
      ));
    default:
return [text];
  }
}

export function getStaggerDelay(index: number, baseDelay: number = 0.04): number {
  return index * baseDelay;
}
