import { FormikContextType, useFormik } from "formik";
import {
  AttributeCollectionField,
  DataCreationField,
} from "../../config/collections.config";
import * as Yup from "yup";
import React from "react";
import { useAppSelector } from "../useAppSelector";

export interface FormGenerator {
  formik: FormikContextType<Record<string, DataCreationField>>;
  fields: DataCreationField[];
}

const useFormGenerator = (): FormGenerator => {
  const {
    itemID,
    isCreating,
    isUpdating,
    isViewing,
    hasAttributes,
    hasCategories,
    fields,
    attributesFields,
    entrySelected,
  } = useAppSelector((state) => state.activeCollection);

  const [validationSchema, setValidationSchema] = React.useState<any>({});
  const [initialValues, setInitialValues] = React.useState<any>({});

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (value, actions) => console.log("You submitted"),
    enableReinitialize: true,
    validateOnMount: true,
  });

  React.useEffect(() => {
    let initialValuesInner: any = {};
    let validationSchemaInner: any = {};

    if (hasCategories) {
      initialValuesInner["categories"] = [];
    }

    if (hasAttributes) {
      let attributeFieldsLocal: AttributeCollectionField[] = attributesFields!;

      let attributeMapInternal: any = {};

      for (const attributeField of attributeFieldsLocal) {
        attributeMapInternal[attributeField.name] = [];
      }

      initialValuesInner["attributes"] = attributeMapInternal;
    }

    for (const field of fields!) {
      switch (field.fieldType) {
        case "time":
          initialValuesInner[field.name] = "";

          validationSchemaInner[field.name] = Yup.string()
            .required("É necessário definir um horário")
            .nullable();

          break;

        case "date":
          initialValuesInner[field.name] = "";

          validationSchemaInner[field.name] = Yup.string()
            .required("É necessário definir uma data")
            .nullable();
          break;

        case "radio":
          isUpdating
            ? (initialValuesInner[field.name] =
                entrySelected.entryValues[field.name])
            : (initialValuesInner[field.name] = field.radioOptions?.[0].value);

          validationSchemaInner[field.name] = Yup.string().required(
            "Selecione pelo menos 1"
          );

          break;

        case "checkbox":
          isUpdating
            ? (initialValuesInner[field.name] =
                entrySelected.entryValues[field.name])
            : (initialValuesInner[field.name] = []);

          validationSchemaInner[field.name] = Yup.array().min(
            2,
            "É necessário escolher pelo menos 2"
          );

          break;
        case "boolean":
          isUpdating
            ? (initialValuesInner[field.name] =
                entrySelected.entryValues[field.name])
            : (initialValuesInner[field.name] = false);

          validationSchemaInner[field.name] = Yup.boolean().required(
            "É necessário"
          );

          break;
        case "string":
          if (isUpdating) {
            initialValuesInner[field.name] =
              entrySelected.entryValues[field.name];
          } else {
            initialValuesInner[field.name] = "";
          }

          validationSchemaInner[field.name] = Yup.string().required(
            "Este campo é obrigatório"
          );
          break;
        case "image":
          isUpdating
            ? (initialValuesInner[field.name] = {
                imageURL: entrySelected.entryValues[field.name].imageURL,
                imageDescription:
                  entrySelected.entryValues[field.name].imageDescription,
              })
            : (initialValuesInner[field.name] = {
                imageURL: "",
                imageDescription: "",
              });

          validationSchemaInner[field.name] = Yup.object({
            imageURL: Yup.string()
              .url("Precisa ser uma URL válida")
              .required("Este campo é obrigatório"),
            imageDescription: Yup.string().required("Este campo é obrigatório"),
          });
          break;
        case "text":
          isUpdating
            ? (initialValuesInner[field.name] =
                entrySelected.entryValues[field.name])
            : (initialValuesInner[field.name] = "");

          validationSchemaInner[field.name] = Yup.string().required(
            "Este campo é obrigatório"
          );
          break;
        case "phone":
          if (isUpdating) {
            initialValuesInner[field.name] =
              entrySelected.entryValues[field.name];
          } else {
            initialValuesInner[field.name] = "";
          }

          validationSchemaInner[field.name] = Yup.string().required(
            "Este campo é obrigatório"
          );
          break;
        case "select":
          initialValuesInner[field.name] = "";
          validationSchemaInner[field.name] = Yup.string().required(
            "É preciso escolher uma opção"
          );
          break;
        case "money":
          isUpdating
            ? (initialValuesInner[field.name] =
                entrySelected.entryValues[field.name])
            : (initialValuesInner[field.name] = "");

          validationSchemaInner[field.name] = Yup.string().required(
            "Este campo é obrigatório"
          );
          break;
        case "markdown":
          isUpdating
            ? (initialValuesInner[field.name] =
                entrySelected.entryValues[field.name])
            : (initialValuesInner[field.name] = "");

          validationSchemaInner[field.name] = Yup.string().notRequired();
          break;

        default:
          initialValuesInner[field.name] = "";
          validationSchemaInner[field.name] = Yup.string().notRequired();
      }
    }

    setInitialValues(initialValuesInner);
    setValidationSchema(validationSchemaInner);
  }, [isCreating, isUpdating, entrySelected]);

  return { fields, formik };
};

export default useFormGenerator;
