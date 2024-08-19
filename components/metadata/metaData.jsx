import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createContext, useContext, useState } from "react";
import TextInput from "./textInput";
import {inputContext} from "../InputContext";
import KeyValueAccordion from './KeyValueAccordion';
import SingleKeyInput from "./SingleKeyInput";


import KeyValueComponent from "./KeyValueComponent";
// import { Key } from "lucide-react";

export default function MetaData() {
  const {
    resourceType,
    setResourceType,
    apiVersion,
    setApiVersion,
    name,
    setName,
    namespace,
    setNamespace,
    labels,
    setLabels,
    annotations,
    setAnnotations,
    clusterName,
    setClusterName,
    creationTimestamp,
    setcreationTimestamp,
    deletionGracePeriodSeconds,
    setdeletionGracePeriodSeconds,
    deletionTimestamp,
    setdeletionTimestamp,
    finalizers,
    setfinalizer,
    generateName,
    setgenerateName,
    generation,
    setgeneration,
    resourceVersion,
    setresourceVersion,
    selfLink,
    setselfLink,
    uid,
    setuid,
  } = useContext(inputContext);

  const keyValueObject = {
    labels: { value: labels, onChange: setLabels },
    annotations: { value: annotations, onChange: setAnnotations },
  };

  const ValueObject ={
    finalizers: { value: finalizers, onChange: setfinalizer },
  }


  const inputFields = [
    { label: "apiVersion", value: apiVersion, onChange: setApiVersion },
    { label: "name", value: name, onChange: setName },
    { label: "namespace", value: namespace, onChange: setNamespace },
    { label: "resourceType", value: resourceType, onChange: setResourceType },
    { label: "clusterName", value: clusterName, onChange: setClusterName },
    { label: "creationTimestamp", value: creationTimestamp, onChange: setcreationTimestamp },
    { label: "deletionGracePeriodSeconds", value: deletionGracePeriodSeconds, onChange: setdeletionGracePeriodSeconds },
    { label: "deletionTimestamp", value: deletionTimestamp, onChange: setdeletionTimestamp },
    { label: "generateName", value: generateName, onChange: setgenerateName },
    { label: "generation", value: generation, onChange: setgeneration },
    { label: "resourceVersion", value: resourceVersion, onChange: setresourceVersion },
    { label: "selfLink", value: selfLink, onChange: setselfLink },
    { label: "uid", value: uid, onChange: setuid },
  ];

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>meta data</AccordionTrigger>
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
              {Object.keys(ValueObject).map((key, index) => (
                <SingleKeyInput
                  key={index}
                  itemNo={index + 1 + 13}
                  label={key}
                  value={ValueObject[key].value}
                  onChange={ValueObject[key].onChange}
                />
              ))}

              {Object.keys(keyValueObject).map((key, index) => (
                <KeyValueComponent
                  key={index}
                  itemNo={index + 1 + 13 + 1 }
                  label={key}
                  value={keyValueObject[key].value}
                  onChange={keyValueObject[key].onChange}
                />
              ))}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
