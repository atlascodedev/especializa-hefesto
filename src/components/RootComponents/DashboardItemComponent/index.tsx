import React from "react";
import { DashboardItemCategory } from "../../../config/collections.config";
import { DashboardItemDictionary } from "../../../dictionaries";

interface Props {
  dashboardItemType: DashboardItemCategory;
}

const DashboardItemComponent = ({ dashboardItemType }: Props) => {
  const DashboardItemDynamic = DashboardItemDictionary[dashboardItemType];

  return <DashboardItemDynamic />;
};

export default DashboardItemComponent;
