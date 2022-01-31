import * as Yup from "yup";
import Category from "../Models/Category";
import Product from "../Models/Product";

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .required()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          })
        ),
    });

    console.log(request);

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(401).json({ error: err.errors });
    }

    const productsId = request.body.products.map((product) => product.id);

    const updateProducts = await Product.findAll({
      where: {
        id: productsId,
      },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const editedProducts = updateProducts.map((product) => {
      const productIndex = request.body.products.findIndex(
        (requestProduct) => requestProduct.id === product.id
      );

      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        url: product.url,
        quantity: request.body.products[productIndex].quantity,
      };

      return newProduct;
    });

    const order = {
      user: {
        id: request.userId,
        name: request.userName,
      },
    };

    return response.status(201).json(editedProducts);
  }
}

export default new OrderController();
