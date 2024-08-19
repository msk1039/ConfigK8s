import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import TextInput from "./textInput";
import { inputContext } from "../InputContext";
import RollBackTo from "./RollBackTo";

import { useContext } from "react";

export default function Spec() {
  const {
    minReadySeconds,
    setMinReadySeconds,
    paused,
    setPaused,
    progressDeadlineSeconds,
    setProgressDeadlineSeconds,
    replicas,
    setReplicas,
    revisionHistoryLimit,
    setRevisionHistoryLimit,
    revision, setRevision
  } = useContext(inputContext);


  const inputFields = [
    {label: "minReadySeconds", value: minReadySeconds, onChange: setMinReadySeconds},
    {label: "paused", value: paused, onChange: setPaused},
    {label: "progressDeadlineSeconds", value: progressDeadlineSeconds, onChange: setProgressDeadlineSeconds},
    {label: "replicas", value: replicas, onChange: setReplicas},
    {label: "revisionHistoryLimit", value: revisionHistoryLimit, onChange: setRevisionHistoryLimit},




  ];

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Spec</AccordionTrigger>
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
              {/* <AccordionItem value="item-6">
                <AccordionTrigger>selector</AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>matchLabels</AccordionTrigger>
                      <AccordionContent>
                        <div>
                          {matchLabels.map((label, index) => (
                            <div key={index} className="flex space-x-2 mb-2">
                              <Input
                                placeholder="Key"
                                value={label.key}
                                onChange={(e) =>
                                  updateMatchLabel(index, "key", e.target.value)
                                }
                              />
                              <Input
                                placeholder="Value"
                                value={label.value}
                                onChange={(e) =>
                                  updateMatchLabel(
                                    index,
                                    "value",
                                    e.target.value
                                  )
                                }
                              />
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => removeMatchLabel(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addMatchLabel}
                          >
                            <PlusCircle className="h-4 w-4 mr-2" /> Add Label
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem> */}
                      <RollBackTo itemNo={6} label={revision} value={revision} onChange={setRevision} />
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        {/* <AccordionItem value="item-2">
          <AccordionTrigger>DNS policy</AccordionTrigger>
          <AccordionContent>
            <Select onValueChange={(e) => setDnsPolicy(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Volume type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ClusterFirst"> ClusterFirst</SelectItem>
                <SelectItem value="ClusterFirstWithHostNet">
                  ClusterFirstWithHostNet
                </SelectItem>
                <SelectItem value="Default">Default</SelectItem>
                <SelectItem value="None">None</SelectItem>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem> */}



      </Accordion>
    </>
  );
}
