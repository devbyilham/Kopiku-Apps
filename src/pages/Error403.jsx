import ErrorPage from "../components/ErrorPage";
export default function Error403() {
  return (
    <div>
      <ErrorPage
        code="403"
        description="You don't have permission to view this page. If you believe this is an error, contact support."
        image="/403.png"
      />
    </div>
  );
}
