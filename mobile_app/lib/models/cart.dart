class CartProducts {
  final String id;
  final String name;
  final String brand;
  final double cost;
  final String picturePath;
  final int quantity;

  CartProducts({
    required this.id,
    required this.name,
    required this.brand,
    required this.cost,
    required this.picturePath,
    required this.quantity,
  });
}

class Cart {
  final List<CartProducts> cartProducts;
  final double totalAmount;
  final int totalQuantity;

  Cart({
    required this.cartProducts,
    required this.totalAmount,
    required this.totalQuantity,
  });
}
