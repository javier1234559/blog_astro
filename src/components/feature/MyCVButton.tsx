import { Button } from "@/components/ui/button";

export default function MyCVButton() {
  return (
    <Button asChild>
      <a href="/cv/mycv.pdf" target="_blank" rel="noopener noreferrer">
        My CV
      </a>
    </Button>
  );
}
