import { Container, Pagination } from "semantic-ui-react";
import { useRouter } from "next/router";

function ProductPagination({ totalPages }) {
  const router = useRouter();

  const handleChange = (event, data) => {
    data.activePage === 1
      ? router.push("/")
      : router.push(`/?page=${data.activePage}`);
  };

  return (
    <Container textAlign="center" style={{ margin: "2em" }}>
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={(event, data) => handleChange(event, data)}
      />
    </Container>
  );
}

export default ProductPagination;
