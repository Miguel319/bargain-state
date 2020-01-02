import React from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Icon,
  Message,
  Header
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import catchErrors from "../utils/catchErrors";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  description: "",
  media: ""
};

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const formValid = Object.values(product).every(element => Boolean(element));

    formValid ? setDisabled(false) : setDisabled(true);
  }, [product]);

  const handleChange = event => {
    const { name, value, files } = event.target;

    if (name === "media") {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleImgUpload = async () => {
    const data = new FormData();

    data.append("file", product.media);
    data.append("upload_preset", "bargainstate");
    data.append("cloud_name", "dvoo3wu0v");

    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;

    return mediaUrl;
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");

      const mediaUrl = await handleImgUpload();

      const productUrl = `${baseUrl}/api/product`;
      const { name, price, description } = product;

      const payload = { name, price, description, mediaUrl };
      const response = await axios.post(productUrl, payload);
      console.log({ response });

      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" color="blue"></Icon>
        Create new product
      </Header>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={error.message} />
        <Message
          success
          icon="check"
          header="Success!"
          content="Product added successfully!"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            value={product.name}
            placeholder="Name"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            type="number"
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            value={product.price}
            step="0.20"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={TextArea}
            name="description"
            label="Description"
            value={product.description}
            placeholder="Description"
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            type="file"
            name="media"
            label="Media"
            accept="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>

        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Group>
          <Form.Field
            control={Button}
            color="blue"
            disabled={disabled || loading}
            icon="plus circle"
            content="Submit"
            type="submit"
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default CreateProduct;
