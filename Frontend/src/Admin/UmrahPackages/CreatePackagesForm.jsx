import { NavLink } from 'react-router-dom';

const CreatePackagesForm = () => {
  return (
    <div>
      <NavLink
        to="/admin/umrahpackages/createpackage-images"
        className="bg-red-400"
      >
        Next
      </NavLink>
    </div>
  );
};

export default CreatePackagesForm;
