import React from 'react';
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Trash2, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function KeyValueComponent({ itemNo, label, value, onChange }) {
  const addLabel = () => {
    onChange([...value, { key: "", value: "" }]);
  };

  const removeLabel = (index) => {
    const newLabels = [...value];
    newLabels.splice(index, 1);
    onChange(newLabels);
  };

  const updateLabel = (index, field, newValue) => {
    const newLabels = [...value];
    newLabels[index][field] = newValue;
    onChange(newLabels);
  };

  return (
    <AccordionItem value={itemNo}>
      <AccordionTrigger>{label}</AccordionTrigger>
      <AccordionContent>
        <div>
          {value.map((labelItem, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <Input
                placeholder="Key"
                value={labelItem.key}
                onChange={(e) => updateLabel(index, "key", e.target.value)}
              />
              <Input
                placeholder="Value"
                value={labelItem.value}
                onChange={(e) => updateLabel(index, "value", e.target.value)}
              />
              <Button variant="outline" size="icon" onClick={() => removeLabel(index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addLabel}>
            <PlusCircle className="h-4 w-4 mr-2" /> Add {label}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}