import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Input } from "@/components/ui/input";

import React, { useContext } from "react";

import { inputContext } from "../InputContext";

export default function RollBackTo({ itemNo, label, value, onChange }) {
  const { rollbackTo, setRollbackTo, revision, setRevision } =
    useContext(inputContext);

  //   const keyValueObject = {
  //     rollbackTo: { value: rollbackTo, onChange: setRollbackTo },
  //   };

  //   const inputFields = [];

  return (
    // <KeyValueAccordion keyValueObject={keyValueObject} inputFields={inputFields} />
    <>
      <AccordionItem value={`item-${itemNo}`}>
        <AccordionTrigger>rollBackTo</AccordionTrigger>
        <AccordionContent>
          <Accordion>
            <AccordionTrigger>revision</AccordionTrigger>
            <AccordionContent>

                <Input
                  placeholder="revision"
                  type="text"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
            </AccordionContent>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
