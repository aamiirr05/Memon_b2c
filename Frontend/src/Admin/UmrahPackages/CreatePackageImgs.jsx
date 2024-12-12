import { NavLink } from 'react-router-dom';
import DragAndDrop from '../../Utils/DragAndDrop';

const CreatePackageImgs = () => {
  return (
    <>
      <form action="" className="w-10/12 mx-auto flex flex-col">
        <label
          htmlFor="packageimages"
          className="ml-5 my-10 font-zodiak text-lg"
        >
          Package Images :
        </label>
        <DragAndDrop />
        <label
          htmlFor="packageimages"
          className="ml-5 mt-20 mb-10 font-zodiak text-lg"
        >
          Mecca Hotel Images :
        </label>
        <DragAndDrop />
        <label
          htmlFor="packageimages"
          className="ml-5 mt-20 mb-10 font-zodiak text-lg"
        >
          Medina Hotel Images :
        </label>
        <DragAndDrop />

        <div className="mt-20 w-2/3 mx-auto flex gap-60 items-center justify-center">
          <NavLink
            to="/admin/umrahpackages/createpackage-form"
            className=" bg-darkgreen w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          >
            Back
          </NavLink>
          <NavLink
            to="/admin/umrahpackages/createpackage-preview"
            className=" bg-darkgreen w-1/3 p-2 text-peach rounded-lg font-semibold font-jakarta hover:animate-shift-up hover:bg-peach hover:text-darkgreen hover:border hover:border-darkgreen mx-auto transition-colors text-center"
          >
            Next
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default CreatePackageImgs;
