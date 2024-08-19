import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { inputContext } from "../InputContext";
import { useContext } from "react";

import TextInput from "./textInput";

export default function Status() {
  const {
    availableReplicas,
    setAvailableReplicas,
    collisionCount,
    setCollisionCount,
    conditions,
    setConditions,
    observedGeneration,
    setObservedGeneration,
    readyReplicas,
    setReadyReplicas,
    StatusReplicas,
    setStatusReplicas,
    unavailableReplicas,
    setUnavailableReplicas,
    updatedReplicas,
    setUpdatedReplicas,
  } = useContext(inputContext);

  const keyValueObject = {
    conditions: { value: conditions, onChange: setConditions },
  };

  const inputFields = [
    {
      label: "availableReplicas",
      value: availableReplicas,
      onChange: setAvailableReplicas,
    },
    {
      label: "collisionCount",
      value: collisionCount,
      onChange: setCollisionCount,
    },
    {
      label: "observedGeneration",
      value: observedGeneration,
      onChange: setObservedGeneration,
    },
    {
      label: "readyReplicas",
      value: readyReplicas,
      onChange: setReadyReplicas,
    },
    {
      label: "StatusReplicas",
      value: StatusReplicas,
      onChange: setStatusReplicas,
    },
    {
      label: "unavailableReplicas",
      value: unavailableReplicas,
      onChange: setUnavailableReplicas,
    },
    {
      label: "updatedReplicas",
      value: updatedReplicas,
      onChange: setUpdatedReplicas,
    },
  ];

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Status</AccordionTrigger>
          <AccordionContent>
            <Accordion type="single" collapsible>
              {inputFields.map((field, index) => (
                <TextInput
                  key={index}
                  itemNo={index + 1}
                  label={field.label}
                  value={field.value}
                  onChange={field.onChange}
                />
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
