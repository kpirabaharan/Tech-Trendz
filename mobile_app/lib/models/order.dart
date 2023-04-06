class OrderProducts {
  final String id;
  final String name;
  final String brand;
  final double cost;
  final String picturePath;
  final int quantity;

  OrderProducts({
    required this.id,
    required this.name,
    required this.brand,
    required this.cost,
    required this.picturePath,
    required this.quantity,
  });
}

class Order {
  final String id;
  final String firstName;
  final String lastName;
  final String orderDate;
  final String deliveryDate;
  final int totalQuantity;
  final double totalAmount;
  List<OrderProducts> orderProducts = [];

  Order({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.orderDate,
    required this.deliveryDate,
    required this.totalQuantity,
    required this.totalAmount,
    required this.orderProducts,
  });
}
