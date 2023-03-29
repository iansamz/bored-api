import { Select } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type SelectStateParams = {
  type: string | undefined;
  setType: Dispatch<SetStateAction<string | undefined>>;
};

export const SelectType = ({ type, setType }: SelectStateParams) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <Select
      placeholder="Select Type"
      name="type"
      value={type}
      onChange={handleChange}
    >
      <option value="recreational">Recreational</option>
      <option value="education">Education</option>
      <option value="busywork">Busy Work</option>
      <option value="charity">Charity</option>
      <option value="social">Social</option>
      <option value="relaxation">Relaxation</option>
    </Select>
  );
};
