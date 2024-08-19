import React, { useContext } from "react";
import { inputContext } from "./InputContext";



const generateYaml = () => {

//   const {
//     resourceType,
//     setResourceType,
//     apiVersion,
//     setApiVersion,
//     name,
//     setName,
//     namespace,
//     setNamespace,
//     labels,
//     setLabels,
//     annotations,
//     setAnnotations,
//     clusterName,
//     setClusterName,
//     creationTimestamp,
//     setcreationTimestamp,
//     deletionGracePeriodSeconds,
//     setdeletionGracePeriodSeconds,
//     deletionTimestamp,
//     setdeletionTimestamp,
//     finalizers,
//     setfinalizer,
//     generateName,
//     setgenerateName,
//     generation,
//     setgeneration,
//     resourceVersion,
//     setresourceVersion,
//     selfLink,
//     setselfLink,
//     uid,
//     setuid,
//     minReadySeconds,
//     setMinReadySeconds,
//     paused,
//     setPaused,
//     progressDeadlineSeconds,
//     setProgressDeadlineSeconds,
//     replicas,
//     setReplicas,
//     revisionHistoryLimit,
//     setRevisionHistoryLimit,
//     matchLabels,
//     setMatchLabels,
//     containers,
//     setContainers,
//     generatedYaml,
//     setGeneratedYaml,
//     validationError,
//     setValidationError,
//     DeploymentStrategy,
//     setDeploymentStrategy,
//     volumeName,
//     setVolumeName,
//     volumeType,
//     setVolumeType,
//     hostNetwork,
//     setHostNetwork,
//     hostPID,
//     setHostPID,
//     hostIPC,
//     setHostIPC,
//     shareProcessNamespace,
//     setShareProcessNamespace,
//     terminationGracePeriodSeconds,
//     setTerminationGracePeriodSeconds,
//     runtimeClassName,
//     setRuntimeClassName,
//     priorityClassName,
//     setPriorityClassName,
//     schedulerName,
//     setSchedulerName,
//     dnsPolicy,
//     setDnsPolicy,
//     availableReplicas,
//     setAvailableReplicas,
//     collisionCount,
//     setCollisionCount,
//     conditions,
//     setConditions,
//     observedGeneration,
//     setObservedGeneration,
//     readyReplicas,
//     setReadyReplicas,
//     StatusReplicas,
//     setStatusReplicas,
//     unavailableReplicas,
//     setUnavailableReplicas,
//     updatedReplicas,
//     setUpdatedReplicas,
//   } = useContext(inputContext);

  let yaml = `apiVersion: ${getApiVersion()}\nkind: ${resourceType}\nmetadata:\n  name: ${name}\n  namespace: ${namespace}\n`;

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

  yaml += "status\n";
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

export default generateYaml;
