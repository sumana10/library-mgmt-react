import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import { getData, deleteData } from "../helper/apicalls";

const ListOfMembers = () => {
  const context = useContext(UserContext);

  const navigate = useNavigate();
  const [values, setValues] = useState([]);

  const members = "members";

  useEffect(() => {
    preload();
  }, []);

  const preload = () => {
    getData(members).then((res) => setValues(res));
  };

  const handleDelete = (id) => {
    deleteData(id, members).then((data) => {
      preload();
    });
  };

  const handleUpdate = (id) => {
    const updateurl = `/addmembers?id=${id}`;
    navigate(updateurl);
  };

  if (!context.user?.role) {
    return navigate("/", { replace: true });
  }
  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <div className="container">
          <div class="my-4 d-flex justify-content-between align-items-center">
            <h1 class="mb-0">List Of Members</h1>
            <button
              class="btn btn-primary"
              type="button"
              onClick={() => navigate("/addmembers")}
            >
              Add Members
            </button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                {/* <th>Issue Date</th> */}
                {/* <th>Expire Date</th> */}
                <th>Fine</th>
                <th>Borrowing</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {values &&
                values.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.phone}</td>
                    {/* <td>{row.issuedate}</td> */}
                    {/* <td>{row.expiredate}</td> */}
                    <td>{row.fine}</td>
                    <td>{row.borrowing}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleUpdate(row.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListOfMembers;
