import InputField from "../components/InputField";

const BookFilter = (props) => {
  const handleChange = (e) => {
    props.handleChange(e);
  };

  const handleSubmit = (e) => {
    props.handleSubmit(e);
  };

  const filter = props.filter;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row"></div>

      <div className="row">
        <div className="col">
          <InputField
            type="number"
            min="0"
            name="fromYear"
            handleChange={handleChange}
            label="Published from year"
            prompt="-"
            value={filter.fromYear ? filter.fromYear : ""}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            min="0"
            name="toYear"
            handleChange={handleChange}
            label="Published to year"
            prompt="-"
            value={filter.toYear ? filter.toYear : ""}
          />
        </div>

        <div className="col">
          <InputField
            type="number"
            min="1"
            name="limit"
            handleChange={handleChange}
            label="Limit of the showed books"
            prompt="-"
            value={filter.limit ? filter.limit : ""}
          />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <input
            type="submit"
            className="btn btn-secondary float-right mt-2"
            value={props.confirm}
          />
        </div>
      </div>
    </form>
  );
};

export default BookFilter;
