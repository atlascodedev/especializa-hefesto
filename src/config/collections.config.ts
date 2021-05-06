import { IconTypes, FormFieldTypes } from "../dictionaries/types";

export interface FieldGroup {
  id: string;
  label: string;
}

export type DashboardItemCategory = "creation" | "visualization";

export interface DashboardItemRoot {
  itemID: string;
  routerPath: string;
  sidebarLabel: string;
  sidebarIcon: IconTypes;
  itemCategory: DashboardItemCategory;
}

export interface RadioField {
  value: string;
  label: string;
}

export interface CheckboxField extends RadioField {}

export interface DataCreationField {
  fieldType: FormFieldTypes;
  label: string;
  initialValue?: string | Array<string>;
  selectOptions?: Array<string>;
  radioOptions?: Array<RadioField>;
  checkboxOptions?: Array<CheckboxField>;
  listOptions?: ListFieldOptions;
  hidden?: boolean;
  private?: boolean;
  required?: boolean;
  currencyPrefix?: string;
  slug?: boolean;
  groupID?: string;
  name: string;
}

export interface ListFieldOptions {
  label: string;
  fieldLabel: string;
  min?: number;
  max?: number;
}

export interface DataCreationItem extends DashboardItemRoot {
  collectionRef: string;
  fields: Array<DataCreationField>;
  attributesFields?: Array<AttributeCollectionField>;
  hasCategories?: boolean | null;
  hasAttributes?: boolean | null;
  fieldGroups?: FieldGroup[];
  showID?: boolean;
}

export interface Attribute {
  label: string;
  name: string;
  attributeValues: Array<string>;
}

export interface AttributeCollectionField {
  label: string;
  name: string;
}

export interface Category {
  uuid: string;
  root?: boolean;
  label: string;
  parent: string | null | undefined;
  uuid_path: Array<string>;
  label_path?: Array<string>;
}

export type DashboardItem = DataCreationItem;

const courseCollection: DashboardItem = {
  collectionRef: "coursesNew",
  itemID: "courses_id",
  itemCategory: "creation",
  sidebarIcon: "CardTravel",
  routerPath: "cursos",
  sidebarLabel: "Curso",
  hasAttributes: false,
  hasCategories: false,
  fieldGroups: [{ id: "infoGroup", label: "Informações" }],
  fields: [
    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Nome do curso",
      name: "courseName",
    },

    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Duração do curso",
      name: "courseDuration",
    },

    {
      groupID: "infoGroup",
      fieldType: "select",
      selectOptions: ["Graduação", "Pós-graduação", "Extensão"],
      label: "Nível do curso",
      name: "courseLevel",
    },

    {
      groupID: "infoGroup",
      fieldType: "list",
      label: "Matriz curricular",
      name: "courseSyllabus",
      hidden: true,
      listOptions: {
        fieldLabel: "Nome da máteria",
        label: "Matriz curricular",
      },
    },

    {
      groupID: "infoGroup",
      fieldType: "text",
      label: "Descrição do curso",
      name: "courseDescription",
      hidden: true,
    },

    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Área do curso",
      name: "courseArea",
    },

    {
      groupID: "infoGroup",
      fieldType: "image",
      label: "Foto para página do curso",
      name: "courseImage",
      hidden: true,
    },

    {
      groupID: "infoGroup",
      fieldType: "image",
      label: "Foto do certificado de E-MEC",
      name: "courseEmecPicture",
      hidden: true,
    },

    {
      groupID: "infoGroup",
      fieldType: "string",
      label: "Link para página de certificado de E-MEC",
      name: "courseEmecURL",
      hidden: true,
    },
  ],
};

const serviceCollection: DashboardItem = {
  collectionRef: "services",
  sidebarIcon: "AccountBox",
  routerPath: "servicos",
  sidebarLabel: "Serviço",
  itemCategory: "creation",
  itemID: "servicesEspecializa",
  fieldGroups: [{ id: "info", label: "Conteúdo" }],
  fields: [
    {
      fieldType: "string",
      label: "Nome do serviço",
      name: "serviceName",
      groupID: "info",
      slug: true,
    },
    {
      fieldType: "image",
      label: "Foto principal",
      name: "servicePicture",
      groupID: "info",
      hidden: true,
    },
    {
      fieldType: "markdown",
      label: "Conteúdo da página",
      name: "serviceContent",
      groupID: "info",
      hidden: true,
    },
  ],
};

const blogCollection: DashboardItem = {
  collectionRef: "portalBlog",
  sidebarIcon: "LibraryBooks",
  routerPath: "blog",
  sidebarLabel: "Blog",
  itemCategory: "creation",
  itemID: "blogPortal",
  fieldGroups: [{ id: "blogInfo", label: "Informações" }],
  fields: [
    {
      groupID: "blogInfo",
      fieldType: "string",
      label: "Título",
      name: "blogTitle",
      slug: true,
    },

    {
      groupID: "blogInfo",
      fieldType: "text",
      label: "Descrição do post",
      name: "blogDescription",
      hidden: true,
    },

    {
      groupID: "blogInfo",
      fieldType: "image",
      label: "Imagem principal",
      name: "featuredImage",
      hidden: true,
    },
    {
      groupID: "blogInfo",
      fieldType: "markdown",
      label: "Texto",
      name: "blogPost",
      hidden: true,
    },
    {
      groupID: "blogInfo",
      fieldType: "boolean",
      label: "Status do post",
      name: "blogActive",
      hidden: true,
    },
  ],
};

const testimonialCollection: DashboardItem = {
  collectionRef: "testimonials",
  itemCategory: "creation",
  itemID: "portalTestimonials",
  routerPath: "depoimentos",
  sidebarLabel: "Depoimento",
  sidebarIcon: "Group",
  fieldGroups: [{ id: "infoTestimonial", label: "Informações" }],
  fields: [
    {
      groupID: "infoTestimonial",
      fieldType: "string",
      label: "Nome do cliente",
      name: "testimonialName",
      slug: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "image",
      label: "Foto do cliente",
      name: "testimonialPicture",
      hidden: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "text",
      label: "Depoimento do cliente",
      name: "testimonialText",
      hidden: true,
    },
    {
      groupID: "infoTestimonial",
      fieldType: "string",
      label: "Cargo/empresa",
      name: "testimonialCompany",
      hidden: true,
    },
  ],
};

const partnersCollection: DashboardItem = {
  collectionRef: "partners",
  itemCategory: "creation",
  itemID: "partnerID",
  routerPath: "parceiros",
  sidebarIcon: "MoreHoriz",
  sidebarLabel: "Parceiro",
  fieldGroups: [{ id: "partnerInfo", label: "Informações" }],
  fields: [
    {
      fieldType: "string",
      label: "Nome do parceiro",
      name: "partnerName",
      groupID: "partnerInfo",
    },
    {
      fieldType: "image",
      label: "Logo do parceiro",
      name: "partnerLogo",
      groupID: "partnerInfo",
      hidden: true,
    },
    {
      fieldType: "string",
      label: "Website do parceiro",
      name: "partnerWebsite",
      groupID: "partnerInfo",
    },
  ],
};

export const collections: Array<DashboardItem> = [
  serviceCollection,
  courseCollection,
  blogCollection,
  testimonialCollection,
  partnersCollection,
];
