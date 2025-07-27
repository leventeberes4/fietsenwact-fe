import { useParams } from "react-router-dom";

export const WarehouseDetail: React.FC = () => {
  let { id } = useParams();

  return <>{id}</>;
};
