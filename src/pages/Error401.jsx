import ErrorPage from "../components/ErrorPage";
export default function Error401() {
  return (
    <div>
      <ErrorPage
        code="401"
        description="You need to log in to access this page. Let’s get you signed in first."
        image="/401.png"
      />
    </div>
  );
}
