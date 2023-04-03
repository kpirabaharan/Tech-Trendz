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
  List<OrderProducts> orderProducts = [];
  final double totalAmount;
  final int totalQuantity;
  final String userId;
  final String date;

  Order({
    required this.orderProducts,
    required this.totalAmount,
    required this.totalQuantity,
    required this.userId,
    required this.date,
  });
}
