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

  return (
    <>
      {/* SEO-friendly hidden text */}
      <Component className="sr-only" {...rest}>
        {content}
      </Component>

      {/* Visible animated text */}
      <Component
        aria-hidden="true"
        className={`overflow-hidden font-bold ${className}`}
        {...rest}
      >
        {content.match(/./gu)?.map((char, index) => (
          <span
            className="animate-text-reveal inline-block [animation-fill-mode:backwards] leading-8 mt-7"
            key={`${char}-${index}`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </Component>
    </>
  );
};
