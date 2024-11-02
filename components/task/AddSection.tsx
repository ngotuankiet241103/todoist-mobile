import React, { useRef, useState } from "react";

import { SectionItem } from "../form/FormProject";
import ButtonForm from "../button/ButtonForm";
type AddSection = {
  section?: SectionItem
  clickCancle: (e?: React.MouseEvent<HTMLDivElement,MouseEvent>) => void;
  clickSubmit: (value: string) => void;
};

const AddSection = ({ clickCancle, clickSubmit,section }: AddSection) => {
  const [isAllow, setAllow] = useState(!!section);
  const inputRef = useRef<HTMLInputElement>(null);
  const hanldeInputChange = () => {
    if (inputRef.current) {
      if (inputRef.current.value) {
        setAllow(true);
      } else {
        setAllow(false);
      }
    }
  };
  const handleAddSection = () => {
    if (inputRef.current) {
        if (inputRef.current.value) {
            clickSubmit(inputRef.current.value);
        }
      }
  }
  return (
    <div className="">
      <input
        onChange={hanldeInputChange}
        ref={inputRef}
        type="text"
        className="px-2 py-1 rounded-lg font-semibold w-full outline-none border border-gray-400"
        placeholder="Name this section"
        defaultValue={section?.name}
      />
      <ButtonForm clickSubmit={handleAddSection} isAllow={isAllow} title={section ? "Save" : "Add section"} clickCancle={clickCancle}></ButtonForm>
    </div>
  );
};

export default AddSection;
