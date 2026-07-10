import React, { type JSX } from "react";

interface TextRevealTWProps {
  as?: keyof JSX.IntrinsicElements;
  content: string;
  className?: string;
}

export const TextRevealTW: React.FC<TextRevealTWProps> = ({
  as: Tag = "p",
  content,
  className = "",
  ...rest
}) => {
  const Component = Tag as keyof JSX.IntrinsicElements;
  const words = content.trim().split(/\s+/);

  return (
    <>
      <Component className="sr-only" {...rest}>
        {content}
      </Component>

      <Component
        aria-hidden="true"
        className={`font-bold ${className}`}
        {...rest}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.28em] last:mr-0"
          >
            <span
              className="inline-block whitespace-nowrap animate-title-word [animation-fill-mode:backwards]"
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {word}
            </span>
          </span>
        ))}
      </Component>
    </>
  );
};
