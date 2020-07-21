import React, { useState } from "react";
import useFetchJobs from "./fetchJobs";
import { Container } from "react-bootstrap";
import Job from "./Job";
import JobsPagination from "./JobsPagination";
import SearchForm from "./SearchForm";
import Spinner from "./Spinner";
import logo from "./img/logo.png";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;

    setPage(1);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  return (
    <Container className="my-5">
      <div>
        <img
          src={logo}
          alt="logo"
          className="mb-4 mr-2"
          style={{ width: "50px" }}
        />
        <h1 className="mb-4" style={{ display: "inline" }}>
          GitHub Jobs
        </h1>
      </div>

      <SearchForm params={params} onParamChange={handleParamChange} />

      {!loading && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
      {loading && <Spinner />}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.map((job) => {
        return <Job key={job.id} job={job} />;
      })}
      {!loading && (
        <JobsPagination
          page={page}
          setPage={setPage}
          hasNextPage={hasNextPage}
        />
      )}
    </Container>
  );
}

export default App;
