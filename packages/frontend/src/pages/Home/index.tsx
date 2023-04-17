import * as React from "react";
import { getAllRules } from "@/services";
import { IGuardRecord } from "@vanguard/shared/models/rule";
import { logoutAfter } from "@/config";

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (props) => {
  const [rules, setRules] = React.useState<IGuardRecord[]>([]);
  React.useEffect(() => {
    getAllRules()
      .req()
      .then((rs) => {
        if (rs.data?.length) {
          setRules(rs.data);
        }
      });
  }, []);

  return (
    <div>
      <button onClick={logoutAfter}>Logout</button>
      {rules.map((e) => (
        <div key={e.prefix}>{e.prefix}</div>
      ))}
    </div>
  );
};

export default Home;
