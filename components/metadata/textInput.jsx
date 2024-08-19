import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TextInput({ itemNo, label, value, onChange }) {
  return (
    <AccordionItem value={`item-${itemNo}`}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent>
        <Input
          placeholder={label}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
