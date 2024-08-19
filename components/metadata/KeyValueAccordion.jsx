import React from 'react';
import KeyValueComponent from './KeyValueComponent';
import TextInput from './textInput';  
import {
  Accordion,

} from "@/components/ui/accordion";


const KeyValueAccordion = ({ keyValueObject, inputFields }) => {
  return (
    <Accordion type="single" collapsible>
      {Object.keys(keyValueObject).map((key, index) => (
        <KeyValueComponent
          key={index}
          itemNo={index + 1}
          label={key}
          value={keyValueObject[key].value}
          onChange={keyValueObject[key].onChange}
        />
      ))}
      {inputFields.map((field, index) => (
        <TextInput
          key={index}
          itemNo={index + 2}
          label={field.label}
          value={field.value}
          onChange={field.onChange}
        />
      ))}
    </Accordion>
  );
};

export default KeyValueAccordion;