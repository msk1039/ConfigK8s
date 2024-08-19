import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PlusCircle, Trash2, Copy, Save, Upload } from "lucide-react";
import { ThemeToggle } from "../components/theme-toggle";
import MetaData from "../components/metadata/metaData";
import Status  from "../components/metadata/Status";
import Spec from "../components/metadata/Spec";

// const inputContext = createContext();
import { inputContext } from "./InputContext";

const ContainerDialog = ({ onAddContainer }) => {
  const initialState = {
    name: "",
    image: "",
    containerPort: "",
    envName: "",
    envValue: "",
    memoryLimit: "",
    cpuLimit: "",
    memoryRequest: "",
    cpuRequest: "",
    volumeMountPath: "",
    volumeName: "",
  };

  const [container, setContainer] = useState(initialState);

  const handleChange = (e) => {
    setContainer({ ...container, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onAddContainer(container);
    setContainer(initialState);
    // Reset form and close dialog
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" /> Add Container
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Container</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            name="name"
            placeholder="Container Name"
            onChange={handleChange}
            value={container.name}
          />
          <Input
            name="image"
            placeholder="Image"
            onChange={handleChange}
            value={container.image}
          />
          <Input
            name="containerPort"
            placeholder="Container Port"
            onChange={handleChange}
            value={container.containerPort}
          />
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>memory limit and request</AccordionTrigger>
              <AccordionContent>
                <Input
                  name="memoryLimit"
                  placeholder="Memory Limit (e.g., 128Mi)"
                  onChange={handleChange}
                  value={container.memoryLimit}
                />
                <Input
                  name="memoryRequest"
                  placeholder="Memory Request (e.g., 64Mi)"
                  onChange={handleChange}
                  value={container.memoryRequest}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>cpu limit and request</AccordionTrigger>
              <AccordionContent>
                <Input
                  name="cpuLimit"
                  placeholder="CPU Limit (e.g., 500m)"
                  onChange={handleChange}
                  value={container.cpuLimit}
                />
                <Input
                  name="cpuRequest"
                  placeholder="CPU Request (e.g., 250m)"
                  onChange={handleChange}
                  value={container.cpuRequest}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>volume mount</AccordionTrigger>
              <AccordionContent>
                <Input
                  name="volumeMountPath"
                  placeholder="Volume Mount Path"
                  onChange={handleChange}
                  value={container.volumeMountPath}
                />
                <Input
                  name="volumeName"
                  placeholder="Volume Name"
                  onChange={handleChange}
                  value={container.volumeName}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Environment variable</AccordionTrigger>
              <AccordionContent>
                <Input
                  name="envName"
                  placeholder="Env Variable Name"
                  onChange={handleChange}
                  value={container.envName}
                />
                <Input
                  name="envValue"
                  placeholder="Env Variable Value"
                  onChange={handleChange}
                  value={container.envValue}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <Button onClick={handleSubmit}>Add Container</Button>
      </DialogContent>
    </Dialog>
  );
};

const K8sYamlGenerator = () => {
  const [resourceType, setResourceType] = useState("development");
  const [apiVersion, setApiVersion] = useState("");

  // METADATA
  const [name, setName] = useState("");
  const [namespace, setNamespace] = useState("default");
  const [labels, setLabels] = useState([{ key: "", value: "" }]);
  const [annotations, setAnnotations] = useState([{ key: "", value: "" }]);
  const [clusterName, setClusterName] = useState("");
  const [creationTimestamp, setcreationTimestamp] = useState("");
  const [deletionGracePeriodSeconds, setdeletionGracePeriodSeconds] =
    useState("");
  const [deletionTimestamp, setdeletionTimestamp] = useState("");
  const [finalizers, setfinalizer] = useState([{ key: "" }]);
  const [generateName, setgenerateName] = useState("");
  const [generation, setgeneration] = useState("");
  const [resourceVersion, setresourceVersion] = useState("");
  const [selfLink, setselfLink] = useState("");
  const [uid, setuid] = useState("");

  // sec
  const [minReadySeconds, setMinReadySeconds] = useState("");
  const [paused, setPaused] = useState(false);
  const [progressDeadlineSeconds, setProgressDeadlineSeconds] = useState("");
  const [replicas, setReplicas] = useState("");
  const [revisionHistoryLimit, setRevisionHistoryLimit] = useState("");
  const [matchLabels, setMatchLabels] = useState([{ key: "", value: "" }]);

  const [revision , setRevision] = useState("");

  const [containers, setContainers] = useState([
    { name: "", image: "", port: "" },
  ]);
  const [generatedYaml, setGeneratedYaml] = useState("");
  const [validationError, setValidationError] = useState("");
  const [DeploymentStrategy, setDeploymentStrategy] = useState("");
  const [volumeName, setVolumeName] = useState("");
  const [volumeType, setVolumeType] = useState("");
  const [hostNetwork, setHostNetwork] = useState(false);
  const [hostPID, setHostPID] = useState(false);
  const [hostIPC, setHostIPC] = useState(false);
  const [shareProcessNamespace, setShareProcessNamespace] = useState(false);
  const [terminationGracePeriodSeconds, setTerminationGracePeriodSeconds] =
    useState("");
  const [runtimeClassName, setRuntimeClassName] = useState("");
  const [priorityClassName, setPriorityClassName] = useState("");
  const [schedulerName, setSchedulerName] = useState("");
  const [dnsPolicy, setDnsPolicy] = useState("");

  //status

  const [availableReplicas, setAvailableReplicas] = useState("");
  const [collisionCount, setCollisionCount] = useState("");
  const [conditions, setConditions] = useState([{ key: "", value: "" }]);
  const [observedGeneration, setObservedGeneration] = useState("");
  const [readyReplicas, setReadyReplicas] = useState("");
  const [StatusReplicas, setStatusReplicas] = useState("");
  const [unavailableReplicas, setUnavailableReplicas] = useState("");
  const [updatedReplicas, setUpdatedReplicas] = useState("");


  useEffect(() => {
    generateYaml();
  }, [
    apiVersion,
    resourceType,
    name,
    namespace,
    labels,
    annotations,
    clusterName,
    creationTimestamp,
    deletionGracePeriodSeconds,
    deletionTimestamp,
    finalizers,
    generateName,
    generation,
    resourceVersion,
    selfLink,
    uid,
    minReadySeconds,
    paused,
    progressDeadlineSeconds,
    replicas,
    revisionHistoryLimit,
    matchLabels,
    revision,
    containers,
    volumeName,
    volumeType,
    dnsPolicy,
    hostNetwork,
    hostPID,
    hostIPC,
    shareProcessNamespace,
    terminationGracePeriodSeconds,
    runtimeClassName,
    priorityClassName,
    schedulerName,
    availableReplicas,
    collisionCount,
    conditions,
    observedGeneration,
    readyReplicas,
    StatusReplicas,
    unavailableReplicas,
    updatedReplicas,
  ]);

  const generateYaml = () => {
    // if (!validateInputs()) return;

    let yaml = `apiVersion: ${apiVersion}\nkind: ${resourceType}\nmetadata:\n  name: ${name}\n  namespace: ${namespace}\n`;

    if (labels.some((label) => label.key && label.value)) {
      yaml += "  labels:\n";
      labels.forEach((label) => {
        if (label.key && label.value) {
          yaml += `    ${label.key}: ${label.value}\n`;
        }
      });
    }
    if (annotations.some((label) => label.key && label.value)) {
      yaml += "  annnotations:\n";
      annotations.forEach((label) => {
        if (label.key && label.value) {
          yaml += `    ${label.key}: ${label.value}\n`;
        }
      });
    }

    if (clusterName != "") {
      yaml += `  clusterName: ${clusterName}\n`;
    }
    if (creationTimestamp != "") {
      yaml += `  creationTimestamp: ${creationTimestamp}\n`;
    }
    if (deletionGracePeriodSeconds != "") {
      yaml += `  deletionGracePeriodSeconds: ${deletionGracePeriodSeconds}\n`;
    }
    if (deletionTimestamp != "") {
      yaml += `  deletionTimestamp: ${deletionTimestamp}\n`;
    }

    if (finalizers.some((label) => label.key)) {
      yaml += "  finalizers:\n";
      finalizers.forEach((label) => {
        if (label.key) {
          yaml += `  - ${label.key}\n`;
        }
      });
    }

    if (generateName != "") {
      yaml += `  generateName: ${generateName}\n`;
    }

    if (generation != "") {
      yaml += `  generation: ${generation}\n`;
    }

    if (resourceVersion != "") {
      yaml += `  resourceVersion: ${resourceVersion}\n`;
    }

    if (selfLink != "") {
      yaml += `  selfLink: ${selfLink}\n`;
    }
    if (uid != "") {
      yaml += `  uid: ${uid}\n`;
    }

    yaml += "spec:\n";

    if (replicas != "") {
      yaml += `  replicas: ${replicas}\n`;
    }

    if (minReadySeconds != "") {
      yaml += `  minReadySeconds: ${minReadySeconds}\n`;
    }

    if (paused != "") {
      yaml += `  paused: ${paused}\n`;
    }

    if (progressDeadlineSeconds != "") {
      yaml += `  progressDeadlineSeconds: ${progressDeadlineSeconds}\n`;
    }

    if (revisionHistoryLimit != "") {
      yaml += `  revisionHistoryLimit: ${revisionHistoryLimit}\n`;
    }

    yaml += `  selector:\n`;

    if (matchLabels.some((label) => label.key && label.value)) {
      yaml += "    matchLabels:\n";
      matchLabels.forEach((label) => {
        if (label.key && label.value) {
          yaml += `      ${label.key}: ${label.value}\n`;
        }
      });
    }


    yaml+="status\n"
    if (availableReplicas != "") {
      yaml += `  availableReplicas: ${availableReplicas}\n`;
    }

    if (collisionCount != "") {
      yaml += `  collisionCount: ${collisionCount}\n`;
    }

    if (conditions.some((label) => label.key && label.value)) {
      yaml += "  conditions:\n";
      conditions.forEach((label) => {
        if (label.key && label.value) {
          yaml += `    ${label.key}: ${label.value}\n`;
        }

      });

    }

    if (observedGeneration != "") {
      yaml += `  observedGeneration: ${observedGeneration}\n`;
    }

    if (readyReplicas != "") {
      yaml += `  readyReplicas: ${readyReplicas}\n`;
    }

    if (StatusReplicas != "") {
      yaml += `  StatusReplicas: ${StatusReplicas}\n`;
    }

    if (unavailableReplicas != "") {
      yaml += `  unavailableReplicas: ${unavailableReplicas}\n`;
    }

    if (updatedReplicas != "") {
      yaml += `  updatedReplicas: ${updatedReplicas}\n`;
    }





    

    // if (resourceType === "Pod" || resourceType === "Deployment") {
    //   if (resourceType === "Deployment") {
    //     yaml += "  replicas: 1\n";
    //   }
    //   yaml += "  containers:\n";
    //   containers.forEach((container) => {
    //     yaml += `  - name: ${container.name}\n`;
    //     yaml += `    image: ${container.image}\n`;
    //     if (container.containerPort) {
    //       yaml += `    ports:\n    - containerPort: ${container.containerPort}\n`;
    //     }
    //     if (container.envName && container.envValue) {
    //       yaml += "    env:\n";
    //       yaml += `    - name: ${container.envName}\n`;
    //       yaml += `      value: "${container.envValue}"\n`;
    //     }
    //     if (
    //       container.memoryLimit ||
    //       container.cpuLimit ||
    //       container.memoryRequest ||
    //       container.cpuRequest
    //     ) {
    //       yaml += "    resources:\n";
    //       if (container.memoryLimit || container.cpuLimit) {
    //         yaml += "      limits:\n";
    //         if (container.memoryLimit)
    //           yaml += `        memory: "${container.memoryLimit}"\n`;
    //         if (container.cpuLimit)
    //           yaml += `        cpu: "${container.cpuLimit}"\n`;
    //       }
    //       if (container.memoryRequest || container.cpuRequest) {
    //         yaml += "      requests:\n";
    //         if (container.memoryRequest)
    //           yaml += `        memory: "${container.memoryRequest}"\n`;
    //         if (container.cpuRequest)
    //           yaml += `        cpu: "${container.cpuRequest}"\n`;
    //       }
    //     }
    //     if (container.volumeMountPath && container.volumeName) {
    //       yaml += "    volumeMounts:\n";
    //       yaml += `    - mountPath: ${container.volumeMountPath}\n`;
    //       yaml += `      name: ${container.volumeName}\n`;
    //     }
    //   });
    // } else if (resourceType === "Service") {
    //   yaml += "  ports:\n";
    //   yaml += "  - port: 80\n";
    //   yaml += "    targetPort: 8080\n";
    //   yaml += "  selector:\n";
    //   yaml += `    app: ${name}\n`;
    // }

    // if (volumeName && volumeType) {
    //   yaml += "  volumes:\n";
    //   yaml += `  - name: ${volumeName}\n`;
    //   yaml += `    ${volumeType}:\n`;
    // }

    // if (resourceType === "Deployment") {
    //   console.log(DeploymentStrategy);
    //   if (DeploymentStrategy === "Recreate") {
    //     yaml += `  strategy:\n    type: ${DeploymentStrategy}\n`;
    //   }
    //   if (DeploymentStrategy === "RollingUpdate") {
    //     yaml += `  strategy:\n    type: ${DeploymentStrategy}\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 1\n`;
    //   }
    // }

    setGeneratedYaml(yaml);
  };

  const getApiVersion = () => {
    switch (resourceType) {
      case "Pod":
        return "v1";
      case "Deployment":
        return "apps/v1";
      case "Service":
        return "v1";
      default:
        return "v1";
    }
  };

  const validateInputs = () => {
    if (!resourceType) {
      setValidationError("Please select a resource type.");
      return false;
    }
    if (!name) {
      setValidationError("Please enter a name for the resource.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const addLabel = () => {
    setLabels([...labels, { key: "", value: "" }]);
  };

  const addAnnotation = () => {
    setAnnotations([...annotations, { key: "", value: "" }]);
  };

  const addFinalizer = () => {
    setfinalizer([...finalizers, { key: "" }]);
  };

  const addMatchLabel = () => {
    setMatchLabels([...matchLabels, { key: "", value: "" }]);
  };

  const removeLabel = (index) => {
    const newLabels = [...labels];
    newLabels.splice(index, 1);
    setLabels(newLabels);
  };
  const removeAnnotation = (index) => {
    const newLabels = [...annotations];
    newLabels.splice(index, 1);
    setAnnotations(newLabels);
  };

  const removeFinalizer = (index) => {
    const newLabels = [...finalizers];
    newLabels.splice(index, 1);
    setfinalizer(newLabels);
  };

  const removeMatchLabel = (index) => {
    const newLabels = [...matchLabels];
    newLabels.splice(index, 1);
    setMatchLabels(newLabels);
  };

  const updateLabel = (index, field, value) => {
    const newLabels = [...labels];
    newLabels[index][field] = value;
    setLabels(newLabels);
  };

  const updateAnnotation = (index, field, value) => {
    const newLabels = [...annotations];
    newLabels[index][field] = value;
    setAnnotations(newLabels);
  };

  const updateFinalizer = (index, field, value) => {
    const newLabels = [...finalizers];
    newLabels[index][field] = value;
    setfinalizer(newLabels);
  };
  const updateMatchLabel = (index, field, value) => {
    const newLabels = [...matchLabels];
    newLabels[index][field] = value;
    setMatchLabels(newLabels);
  };

  const addContainer = (newContainer) => {
    setContainers([...containers, newContainer]);
  };

  const removeContainer = (index) => {
    const newContainers = [...containers];
    newContainers.splice(index, 1);
    setContainers(newContainers);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedYaml);
  };

  const saveConfiguration = () => {
    const config = {
      resourceType,
      name,
      namespace,
      labels,
      containers,
    };
    const configString = JSON.stringify(config);
    const blob = new Blob([configString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "k8s-config.json";
    a.click();
  };

  const loadConfiguration = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          setResourceType(config.resourceType);
          setName(config.name);
          setNamespace(config.namespace);
          setLabels(config.labels);
          setContainers(config.containers);
        } catch (error) {
          setValidationError("Invalid configuration file");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <inputContext.Provider
      value={{
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
        matchLabels,
        setMatchLabels,
        containers,
        setContainers,
        generatedYaml,
        setGeneratedYaml,
        validationError,
        setValidationError,
        DeploymentStrategy,
        setDeploymentStrategy,
        volumeName,
        setVolumeName,
        volumeType,
        setVolumeType,
        hostNetwork,
        setHostNetwork,
        hostPID,
        setHostPID,
        hostIPC,
        setHostIPC,
        shareProcessNamespace,
        setShareProcessNamespace,
        terminationGracePeriodSeconds,
        setTerminationGracePeriodSeconds,
        runtimeClassName,
        setRuntimeClassName,
        priorityClassName,
        setPriorityClassName,
        schedulerName,
        setSchedulerName,
        dnsPolicy,
        setDnsPolicy,
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
        revision,
        setRevision,
      }}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-between">
          Kubernetes Deployment <ThemeToggle></ThemeToggle>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="api version"
                  value={apiVersion}
                  onChange={(e) => setApiVersion(e.target.value)}
                />

                {/* {(resourceType === "Pod" || resourceType === "deployment") && (
                <div>
                  <h3 className="font-semibold mb-2">Containers</h3>
                  {containers.map((container, index) => (
                    <div
                      key={index}
                      className="mb-2 flex justify-between items-center"
                    >
                      <span>
                        {container.name} - {container.image}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeContainer(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <ContainerDialog onAddContainer={addContainer} />
                </div>
              )} */}
                <MetaData />
                {/* <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Spec</AccordionTrigger>
                    <AccordionContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>minReadySeconds</AccordionTrigger>
                          <AccordionContent>
                            <Input
                              placeholder="minReadySeconds"
                              value={minReadySeconds}
                              onChange={(e) =>
                                setMinReadySeconds(e.target.value)
                              }
                            />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>paused</AccordionTrigger>
                          <AccordionContent>
                            <Input
                              placeholder="paused"
                              value={paused}
                              onChange={(e) => setPaused(e.target.value)}
                            />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>
                            progressDeadlineSeconds
                          </AccordionTrigger>
                          <AccordionContent>
                            <Input
                              placeholder="progressDeadlineSeconds"
                              value={progressDeadlineSeconds}
                              onChange={(e) =>
                                setProgressDeadlineSeconds(e.target.value)
                              }
                            />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger>replicas</AccordionTrigger>
                          <AccordionContent>
                            <Input
                              placeholder="replicas"
                              value={replicas}
                              onChange={(e) => setReplicas(e.target.value)}
                            />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                          <AccordionTrigger>
                            revisionHistoryLimit
                          </AccordionTrigger>
                          <AccordionContent>
                            <Input
                              placeholder="revisionHistoryLimit"
                              value={revisionHistoryLimit}
                              onChange={(e) =>
                                setRevisionHistoryLimit(e.target.value)
                              }
                            />
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                          <AccordionTrigger>selector</AccordionTrigger>
                          <AccordionContent>
                            <Accordion type="single" collapsible>
                              <AccordionItem value="item-1">
                                <AccordionTrigger>matchLabels</AccordionTrigger>
                                <AccordionContent>
                                  <div>
                                    {matchLabels.map((label, index) => (
                                      <div
                                        key={index}
                                        className="flex space-x-2 mb-2"
                                      >
                                        <Input
                                          placeholder="Key"
                                          value={label.key}
                                          onChange={(e) =>
                                            updateMatchLabel(
                                              index,
                                              "key",
                                              e.target.value
                                            )
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
                                          onClick={() =>
                                            removeMatchLabel(index)
                                          }
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
                                      <PlusCircle className="h-4 w-4 mr-2" />{" "}
                                      Add Label
                                    </Button>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>DNS policy</AccordionTrigger>
                    <AccordionContent>
                      <Select onValueChange={(e) => setDnsPolicy(e)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Volume type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value=" ClusterFirst">
                            {" "}
                            ClusterFirst
                          </SelectItem>
                          <SelectItem value="ClusterFirstWithHostNet">
                            ClusterFirstWithHostNet
                          </SelectItem>
                          <SelectItem value="Default">Default</SelectItem>
                          <SelectItem value="None">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}

                <Spec/>

                <Status />

                <div className="flex space-x-2">
                  <Button onClick={generateYaml}>Generate YAML</Button>
                  <Button variant="outline" onClick={saveConfiguration}>
                    <Save className="h-4 w-4 mr-2" /> Save Config
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() =>
                      document.getElementById("load-config").click()
                    }
                  >
                    <Upload className="h-4 w-4 mr-2" /> Load Config
                  </Button>
                  <input
                    id="load-config"
                    type="file"
                    accept=".json"
                    style={{ display: "none" }}
                    onChange={loadConfiguration}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Generated YAML</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedYaml}
                readOnly
                className="h-[480px] mb-2"
              />
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" /> Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
        </div>
        {validationError && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}
      </div>
    </inputContext.Provider>
  );
};

export default K8sYamlGenerator;
