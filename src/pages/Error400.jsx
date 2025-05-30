import ErrorPage from "../components/ErrorPage";
export default function Error400() {
  return (
    <div>
      <ErrorPage
        code="400"
        description="Oops! Something's not quite right with your request. Please check and try again."
        image="/400.png"
      />
    </div>
  );
}
